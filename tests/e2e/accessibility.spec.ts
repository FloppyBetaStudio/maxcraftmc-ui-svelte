import { expect, test } from "@playwright/test";

test("DatePicker exposes a named keyboard-operable calendar button", async ({
  page,
}) => {
  await page.goto("/?theme=light");

  const calendarButton = page.getByRole("button", {
    name: "Open calendar for 维护日期",
  });
  await expect(calendarButton).toBeVisible();
  await calendarButton.focus();
  await calendarButton.press("Enter");

  await expect(page.locator(".flatpickr-calendar.open")).toBeVisible();
});

test("TooltipIcon defaults to tooltip text without overriding an explicit name", async ({
  page,
}) => {
  await page.goto("/?theme=light");

  await expect(
    page.getByRole("button", { name: "图标 tooltip", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "自定义图标名称", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "默认 tooltip 名称", exact: true }),
  ).toHaveCount(0);
});

test("programmatic Modal close reports the same typed detail at runtime", async ({
  page,
}) => {
  await page.goto("/?theme=light");
  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent("maxcraft-gallery-open-modal"));
  });
  await expect(
    page.getByRole("dialog", { name: "Component state" }),
  ).toBeVisible();

  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent("maxcraft-gallery-close-modal"));
  });

  await expect(page.locator("main.gallery")).toHaveAttribute(
    "data-modal-close-trigger",
    "programmatic",
  );
});

test("theme honors reduced motion and forced colors", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?theme=light");

  const primaryButton = page.getByRole("button", { name: "主操作" });
  await expect(primaryButton).toHaveCSS("transition-duration", "0s");
  await expect(page.locator(".bx--loading__stroke").first()).toHaveCSS(
    "animation-name",
    "none",
  );

  await page.emulateMedia({ forcedColors: "active" });
  const calendarButton = page.getByRole("button", {
    name: "Open calendar for 维护日期",
  });
  await calendarButton.focus();
  await expect(calendarButton).toHaveCSS("outline-style", "solid");
  await expect(calendarButton).toHaveCSS("box-shadow", "none");
});
