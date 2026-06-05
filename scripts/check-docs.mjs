import { access, readFile } from "node:fs/promises";

const requiredDocs = [
  "README.md",
  "CHANGELOG.md",
  "docs/installation.md",
  "docs/svelte-migration.md",
  "docs/hugo-integration.md",
  "docs/theme-tokens.md",
  "docs/component-catalog.md",
  "docs/consumer-checklist.md",
  "docs/compatibility.md",
  "docs/contributing.md",
  "docs/publishing.md",
  "examples/svelte-basic/+layout.svelte",
  "examples/svelte-basic/+page.svelte",
  "examples/component-gallery/index.html",
  "examples/component-gallery/src/App.svelte",
  "examples/component-gallery/src/main.js",
  "examples/component-gallery/vite.config.js",
  "examples/hugo-head.html",
  "examples/hugo-module-mounts.toml",
];

for (const doc of requiredDocs) {
  await access(new URL(`../${doc}`, import.meta.url));
}

const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");
const linkedDocs = [...readme.matchAll(/\]\(((?:docs\/)?[^):]+\.md)\)/g)].map(
  (match) => match[1],
);

for (const doc of linkedDocs) {
  await access(new URL(`../${doc}`, import.meta.url));
}

console.log(`Docs OK (${requiredDocs.length} files, ${linkedDocs.length} README links)`);
