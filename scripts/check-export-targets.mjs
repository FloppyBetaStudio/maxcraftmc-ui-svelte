import { access, readFile } from "node:fs/promises";

const indexUrl = new URL("../src/index.js", import.meta.url);
const source = await readFile(indexUrl, "utf8");
const exportFromRegex = /export\s+(?:\{[\s\S]*?\}|[^;]+?)\s+from\s+"([^"]+)"/g;
const targets = new Set();

for (const match of source.matchAll(exportFromRegex)) {
  targets.add(match[1]);
}

const extensions = ["", ".js", ".svelte", "/index.js"];
const missing = [];

for (const target of targets) {
  const candidates = extensions.map(
    (extension) => new URL(`../src/${target}${extension}`, import.meta.url),
  );
  let found = false;

  for (const candidate of candidates) {
    try {
      await access(candidate);
      found = true;
      break;
    } catch {
      // Try the next export target shape.
    }
  }

  if (!found) missing.push(target);
}

if (missing.length > 0) {
  console.error(`Missing export targets: ${missing.join(", ")}`);
  process.exitCode = 1;
} else {
  console.log(`Export targets OK (${targets.size})`);
}
