import { mkdir, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { build, preview } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

const packageRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const galleryRoot = resolve(packageRoot, "examples/component-gallery");
const outDir = resolve(packageRoot, "output/playwright/component-gallery");
await mkdir(outDir, { recursive: true });
const require = createRequire(import.meta.url);
let chromium;

async function cachedPlaywrightCandidates() {
  const cacheRoots = [
    process.env.npm_config_cache,
    process.env.npm_config_cache?.replaceAll("/", "\\"),
    process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, "npm-cache"),
    process.env.USERPROFILE && join(process.env.USERPROFILE, "scoop", "persist", "nodejs", "cache"),
  ].filter(Boolean);
  const candidates = [];

  for (const cacheRoot of new Set(cacheRoots)) {
    const npxRoot = join(cacheRoot, "_npx");
    try {
      const entries = await readdir(npxRoot, { withFileTypes: true });
      candidates.push(
        ...entries
          .filter((entry) => entry.isDirectory())
          .map((entry) => join(npxRoot, entry.name, "node_modules", "playwright")),
      );
    } catch {
      // Try the next cache root.
    }
  }

  return candidates;
}

for (const candidate of ["playwright", ...await cachedPlaywrightCandidates()]) {
  try {
    ({ chromium } = require(candidate));
    break;
  } catch {
    // Try the next local Playwright location.
  }
}

if (!chromium) {
  throw new Error("Playwright is required for component gallery auditing. Install it or run through the Codex Playwright cache.");
}

function parsePx(value) {
  return Number.parseFloat(value || "0") || 0;
}

function auditScript() {
  const visible = (el) => {
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
  };
  const parse = (value) => Number.parseFloat(value || "0") || 0;
  const parseColor = (value) => {
    const match = String(value).match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return null;
    return match.slice(1, 4).map(Number);
  };
  const effectiveBackground = (style) => {
    if (!/rgba\(0,\s*0,\s*0,\s*0\)/.test(style.backgroundColor)) return style.backgroundColor;
    const gradientColor = String(style.backgroundImage).match(/rgba?\(\d+,\s*\d+,\s*\d+(?:,\s*[\d.]+)?\)/);
    return gradientColor ? gradientColor[0] : style.backgroundColor;
  };
  const luminance = ([r, g, b]) => {
    const channel = (value) => {
      const normalized = value / 255;
      return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
  };
  const contrast = (fg, bg) => {
    const foreground = parseColor(fg);
    const background = parseColor(bg);
    if (!foreground || !background) return null;
    const a = luminance(foreground);
    const b = luminance(background);
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  };
  const pseudoBox = (el, pseudo) => {
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el, pseudo);
    const left = rect.left + parse(style.left);
    const top = rect.top + parse(style.top);
    const width = parse(style.width);
    const height = parse(style.height);
    return {
      left,
      top,
      width,
      height,
      cx: left + width / 2,
      cy: top + height / 2,
    };
  };
  const carbonBlues = new Set([
    "rgb(15, 98, 254)",
    "rgba(15, 98, 254, 1)",
    "rgb(51, 112, 255)",
    "rgb(69, 137, 255)",
    "rgb(120, 169, 255)",
  ]);
  const isBlue = (value) => carbonBlues.has(value);
  const overflowElements = [];
  for (const el of document.querySelectorAll("body *")) {
    if (!visible(el)) continue;
    const rect = el.getBoundingClientRect();
    if (rect.right > innerWidth + 1 || rect.left < -1) {
      const style = getComputedStyle(el);
      if (!(style.position === "fixed" && rect.left < 0 && rect.right <= 1)) {
        overflowElements.push({
          tag: el.tagName,
          cls: String(el.className),
          text: (el.textContent || "").trim().slice(0, 80),
          rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height },
        });
      }
    }
  }

  const rounded = [];
  const blue = [];
  const invalidDefaultBg = [];
  const thinControls = [];
  const badNumber = [];
  const lowContrastSelectedTiles = [];
  const visualRegressions = [];
  for (const el of document.querySelectorAll("[class*='bx--']")) {
    if (!visible(el)) continue;
    const style = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    const cls = String(el.className);
    const ownRadius = Math.max(
      parse(style.borderTopLeftRadius),
      parse(style.borderTopRightRadius),
      parse(style.borderBottomLeftRadius),
      parse(style.borderBottomRightRadius),
    );
    const ownBlue = [
      "color",
      "backgroundColor",
      "borderTopColor",
      "borderRightColor",
      "borderBottomColor",
      "borderLeftColor",
      "outlineColor",
    ].filter((prop) => isBlue(style[prop]));
    const pseudo = ["::before", "::after"].map((part) => {
      const s = getComputedStyle(el, part);
      return {
        part,
        radius: Math.max(
          parse(s.borderTopLeftRadius),
          parse(s.borderTopRightRadius),
          parse(s.borderBottomLeftRadius),
          parse(s.borderBottomRightRadius),
        ),
        blue: ["color", "backgroundColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"].filter((prop) => isBlue(s[prop])),
      };
    });
    const roundedPseudo = pseudo.filter((item) => item.radius > 1);
    const bluePseudo = pseudo.filter((item) => item.blue.length > 0);
    if (ownRadius > 1 || roundedPseudo.length) {
      rounded.push({ tag: el.tagName, cls, text: (el.textContent || "").trim().slice(0, 80), ownRadius, pseudo: roundedPseudo });
    }
    if (ownBlue.length || bluePseudo.length) {
      blue.push({ tag: el.tagName, cls, text: (el.textContent || "").trim().slice(0, 80), ownBlue, pseudo: bluePseudo });
    }
    if (
      /(bx--text-input--invalid|bx--text-input--warning|bx--text-area--invalid|bx--select-input--invalid)/.test(cls) &&
      ["rgb(255, 255, 255)", "rgb(244, 244, 244)"].includes(style.backgroundColor)
    ) {
      invalidDefaultBg.push({ tag: el.tagName, cls, bg: style.backgroundColor, text: (el.textContent || el.getAttribute("placeholder") || "").trim().slice(0, 80) });
    }
    if (
      /(bx--btn|bx--text-input|bx--text-area|bx--select-input|bx--list-box__field|bx--number__input-wrapper|bx--number__control-btn|bx--toggle__switch|bx--pagination-nav__page)/.test(cls) &&
      !/(bx--btn--icon-only|bx--overflow-menu)/.test(cls)
    ) {
      const widths = [style.borderTopWidth, style.borderRightWidth, style.borderBottomWidth, style.borderLeftWidth].map(parse);
      const maxBorder = Math.max(...widths);
      if (widths.some((w) => w > 0) && maxBorder < 2 && rect.width > 12 && rect.height > 12) {
        thinControls.push({ tag: el.tagName, cls, border: widths, rect: { w: Math.round(rect.width), h: Math.round(rect.height) } });
      }
    }
  }

  for (const el of document.querySelectorAll(".bx--number")) {
    if (!visible(el)) continue;
    const rect = el.getBoundingClientRect();
    const buttons = [...el.querySelectorAll(".bx--number__control-btn")].filter(visible).map((button) => button.getBoundingClientRect());
    if (buttons.some((button) => button.right > rect.right + 1 || button.left < rect.left - 1 || button.width < 24)) {
      badNumber.push({ cls: String(el.className), rect: { w: rect.width, h: rect.height }, buttons: buttons.map((button) => ({ w: button.width, h: button.height, x: button.x })) });
    }
  }

  for (const el of document.querySelectorAll(".bx--tile--is-selected")) {
    if (!visible(el)) continue;
    const style = getComputedStyle(el);
    const bg = effectiveBackground(style);
    const ratio = contrast(style.color, bg);
    if (ratio !== null && ratio < 4.5) {
      lowContrastSelectedTiles.push({
        tag: el.tagName,
        cls: String(el.className),
        text: (el.textContent || "").trim().slice(0, 80),
        color: style.color,
        bg,
        ratio: Number(ratio.toFixed(2)),
      });
    }
  }

  for (const header of document.querySelectorAll(".bx--header")) {
    if (!visible(header)) continue;
    const headerStyle = getComputedStyle(header);
    const headerBg = effectiveBackground(headerStyle);
    for (const item of header.querySelectorAll(".bx--header__name, .bx--header__menu-item, .bx--header__action, .bx--header-search-button")) {
      if (!visible(item)) continue;
      const itemStyle = getComputedStyle(item);
      const itemBg = effectiveBackground(itemStyle);
      const bg = /rgba\(0,\s*0,\s*0,\s*0\)/.test(itemBg) ? headerBg : itemBg;
      const ratio = contrast(itemStyle.color, bg);
      if (ratio !== null && ratio < 4.5) {
        visualRegressions.push({
          kind: "header-contrast",
          text: (item.textContent || item.getAttribute("aria-label") || "").trim().slice(0, 80),
          color: itemStyle.color,
          bg,
          ratio: Number(ratio.toFixed(2)),
        });
      }
    }
  }

  for (const input of document.querySelectorAll(".bx--checkbox:checked, .bx--checkbox:indeterminate")) {
    const label = input.id ? document.querySelector(`label[for="${CSS.escape(input.id)}"]`) : input.nextElementSibling;
    if (!label || !visible(label)) continue;
    const box = pseudoBox(label, "::before");
    const check = pseudoBox(label, "::after");
    const dx = check.cx - box.cx;
    const dy = check.cy - box.cy;
    if (Math.abs(dx) > 0.75 || Math.abs(dy) > 0.75) {
      visualRegressions.push({
        kind: "checkbox-checkmark-center",
        text: (label.textContent || "").trim().slice(0, 80),
        dx: Number(dx.toFixed(2)),
        dy: Number(dy.toFixed(2)),
        box: { w: Number(box.width.toFixed(2)), h: Number(box.height.toFixed(2)) },
        check: { w: Number(check.width.toFixed(2)), h: Number(check.height.toFixed(2)) },
      });
    }
  }

  for (const page of document.querySelectorAll(".bx--pagination-nav__page:not(.bx--pagination-nav__page--direction)")) {
    if (!visible(page)) continue;
    const span = page.querySelector("span");
    if (!span || !visible(span)) continue;
    const pageRect = page.getBoundingClientRect();
    const spanRect = span.getBoundingClientRect();
    const dx = spanRect.left + spanRect.width / 2 - (pageRect.left + pageRect.width / 2);
    const dy = spanRect.top + spanRect.height / 2 - (pageRect.top + pageRect.height / 2);
    if (Math.abs(dx) > 0.75 || Math.abs(dy) > 0.75) {
      visualRegressions.push({
        kind: "pagination-label-center",
        text: span.textContent.trim().slice(0, 24),
        dx: Number(dx.toFixed(2)),
        dy: Number(dy.toFixed(2)),
        page: { w: Number(pageRect.width.toFixed(2)), h: Number(pageRect.height.toFixed(2)) },
        label: { w: Number(spanRect.width.toFixed(2)), h: Number(spanRect.height.toFixed(2)) },
      });
    }
  }

  return {
    overflow: Math.max(0, document.documentElement.scrollWidth - innerWidth),
    overflowElements: overflowElements.slice(0, 8),
    rounded: rounded.slice(0, 8),
    blue: blue.slice(0, 8),
    invalidDefaultBg: invalidDefaultBg.slice(0, 8),
    thinControls: thinControls.slice(0, 8),
    badNumber: badNumber.slice(0, 8),
    lowContrastSelectedTiles: lowContrastSelectedTiles.slice(0, 8),
    visualRegressions: visualRegressions.slice(0, 8),
    counts: {
      overflowElements: overflowElements.length,
      rounded: rounded.length,
      blue: blue.length,
      invalidDefaultBg: invalidDefaultBg.length,
      thinControls: thinControls.length,
      badNumber: badNumber.length,
      lowContrastSelectedTiles: lowContrastSelectedTiles.length,
      visualRegressions: visualRegressions.length,
    },
  };
}

async function runScenario(page, name) {
  if (name === "focus") {
    await page.locator(".bx--text-input").first().focus({ timeout: 1000 }).catch(() => {});
  }

  if (name === "date-picker") {
    await page.locator(".bx--date-picker__icon:not(.bx--date-picker__icon--invalid):not(.bx--date-picker__icon--warn)").first().click({ timeout: 1000 }).catch(() => {});
  }

  if (name === "copy-feedback") {
    await page.locator(".bx--copy-btn").first().click({ timeout: 1000 }).catch(() => {});
    await page.waitForTimeout(120);
  }

  if (name === "tile-active") {
    const tile = page.locator(".bx--clickable-tile, .bx--tile--clickable").first();
    const box = await tile.boundingBox({ timeout: 1000 }).catch(() => null);
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
    }
  }

  if (name === "button-active") {
    const button = page.locator(".bx--btn:not(:disabled)").first();
    const box = await button.boundingBox({ timeout: 1000 }).catch(() => null);
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
    }
  }

  if (name === "button-ghost-hover") {
    const button = page.locator(".bx--btn--ghost:not(:disabled)").first();
    const box = await button.boundingBox({ timeout: 1000 }).catch(() => null);
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    }
  }

  if (name === "menus") {
    await page.locator(".bx--list-box__field").first().click({ timeout: 1000 }).catch(() => {});
    await page.locator(".bx--overflow-menu").first().click({ timeout: 1000 }).catch(() => {});
  }

  if (name === "modal") {
    await page.evaluate(() => {
      const event = new CustomEvent("maxcraft-gallery-open-modal");
      window.dispatchEvent(event);
    });
  }

  await page.waitForTimeout(160);
}

try {
  await build({
    root: galleryRoot,
    configFile: resolve(galleryRoot, "vite.config.js"),
    logLevel: "silent",
  });
  const server = await preview({
    root: galleryRoot,
    configFile: resolve(galleryRoot, "vite.config.js"),
    logLevel: "silent",
    preview: {
      host: "127.0.0.1",
      port: 0,
    },
  });
  const address = server.httpServer.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;
  const browser = await chromium.launch({ headless: true, args: ["--no-proxy-server"] });
  const failures = [];
  const scenariosByWidth = new Map([
    [390, ["initial", "focus", "date-picker", "copy-feedback", "tile-active", "button-active", "button-ghost-hover", "menus", "modal"]],
    [774, ["initial", "focus", "date-picker", "button-ghost-hover", "menus", "modal"]],
    [1366, ["initial", "modal"]],
  ]);
  for (const theme of ["light", "dark"]) {
    for (const width of [390, 774, 1366]) {
      const scenarios = scenariosByWidth.get(width) ?? ["initial"];
      for (const scenario of scenarios) {
        const context = await browser.newContext({
          viewport: { width, height: 906 },
          colorScheme: theme === "dark" ? "dark" : "light",
        });
        const page = await context.newPage();
        page.setDefaultTimeout(5000);
        await page.goto(`${baseUrl}/?theme=${theme}`, { waitUntil: "networkidle", timeout: 30000 });
        await page.getByRole("heading", { name: "Component Gallery" }).waitFor({ timeout: 10000 });
        const renderedComponentCount = await page.locator("[class*='bx--']").count();
        if (renderedComponentCount < 50) {
          throw new Error(`Component gallery rendered too few Carbon components (${renderedComponentCount})`);
        }
        await runScenario(page, scenario);
        await page.screenshot({ path: resolve(outDir, `${theme}-${width}-${scenario}.png`), fullPage: true });
        const result = await page.evaluate(auditScript);
        const failed =
          result.overflow > 1 ||
          result.counts.overflowElements > 0 ||
          result.counts.rounded > 0 ||
          result.counts.blue > 0 ||
          result.counts.invalidDefaultBg > 0 ||
          result.counts.thinControls > 0 ||
          result.counts.badNumber > 0 ||
          result.counts.lowContrastSelectedTiles > 0 ||
          result.counts.visualRegressions > 0;
        console.log(
          `${failed ? "FAIL" : "PASS"} gallery ${theme} ${width} ${scenario} overflow=${result.overflow}/${result.counts.overflowElements} rounded=${result.counts.rounded} blue=${result.counts.blue} invalidBg=${result.counts.invalidDefaultBg} thin=${result.counts.thinControls} badNumber=${result.counts.badNumber} lowTileContrast=${result.counts.lowContrastSelectedTiles} visual=${result.counts.visualRegressions}`,
        );
        if (failed) failures.push({ theme, width, scenario, result });
        await page.mouse.up().catch(() => {});
        await context.close();
      }
    }
  }
  await browser.close();
  await new Promise((resolveClose) => server.httpServer.close(resolveClose));
  if (failures.length) {
    for (const failure of failures) console.log(JSON.stringify(failure, null, 2));
    process.exit(1);
  }
} finally {
}
