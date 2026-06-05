import { access } from "node:fs/promises";

const entrypoints = [
  "css/all.css",
  "css/white.css",
  "css/g10.css",
  "css/g80.css",
  "css/g90.css",
  "css/g100.css",
  "css/maxcraft.css",
  "tokens/maxcraft.css",
];

for (const entrypoint of entrypoints) {
  await access(new URL(`../${entrypoint}`, import.meta.url));
}

console.log(`CSS entrypoints OK (${entrypoints.length})`);
