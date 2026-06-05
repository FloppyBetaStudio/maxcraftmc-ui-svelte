import { readFile } from "node:fs/promises";

const exportRegex = /export\s+(?:\{[^}]+\}|default\s+as\s+\w+|const\s+\w+|function\s+\w+)/g;

function namesFromExportBlock(block) {
  const names = [];
  const body = block.match(/\{([^}]+)\}/)?.[1];

  if (!body) {
    const direct = block.match(/(?:default\s+as|const|function)\s+(\w+)/)?.[1];
    return direct ? [direct] : [];
  }

  for (const part of body.split(",")) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const alias = trimmed.match(/\bas\s+(\w+)$/)?.[1];
    names.push(alias ?? trimmed.split(/\s+/)[0]);
  }

  return names;
}

async function readExports(path) {
  const source = await readFile(path, "utf8");
  const names = new Set();
  for (const match of source.matchAll(exportRegex)) {
    for (const name of namesFromExportBlock(match[0])) names.add(name);
  }
  return names;
}

const localSrc = await readExports(new URL("../src/index.js", import.meta.url));
const localTypes = await readExports(new URL("../types/index.d.ts", import.meta.url));
const baselineSrc = await readExports(
  new URL("../node_modules/carbon-components-svelte/src/index.js", import.meta.url),
);
const baselineTypes = await readExports(
  new URL("../node_modules/carbon-components-svelte/types/index.d.ts", import.meta.url),
);

function diff(expected, actual) {
  return [...expected].filter((name) => !actual.has(name)).sort();
}

const checks = [
  ["src missing baseline src exports", diff(baselineSrc, localSrc)],
  ["src has extra exports", diff(localSrc, baselineSrc)],
  ["types missing baseline type exports", diff(baselineTypes, localTypes)],
  ["types have extra exports", diff(localTypes, baselineTypes)],
  ["src missing local type exports", diff(localTypes, localSrc)],
  ["types missing local src exports", diff(localSrc, localTypes)],
];

const failed = checks.filter(([, names]) => names.length > 0);

if (failed.length > 0) {
  for (const [label, names] of failed) {
    console.error(`${label}: ${names.join(", ")}`);
  }
  process.exitCode = 1;
} else {
  console.log(`API exports OK (${localSrc.size})`);
}
