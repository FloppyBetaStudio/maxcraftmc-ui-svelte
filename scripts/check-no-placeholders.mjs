import { readdir, readFile } from "node:fs/promises";

const roots = ["src", "css", "tokens"];
const extensions = new Set([".js", ".svelte", ".ts", ".d.ts", ".css", ".scss"]);
const forbidden = [
  /\bnot implemented\b/i,
  /\bunimplemented\b/i,
  /\bstub\b/i,
  /\bplaceholder component\b/i,
  /\bcoming soon\b/i,
  /throw new Error\(["'`]not implemented/i,
  /throw new Error\(["'`]todo/i,
];

function hasAllowedExtension(path) {
  return [...extensions].some((extension) => path.endsWith(extension));
}

async function walk(path) {
  let entries = [];
  try {
    entries = await readdir(new URL(`../${path}`, import.meta.url), {
      withFileTypes: true,
    });
  } catch (error) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }
  const files = [];

  for (const entry of entries) {
    const child = `${path}/${entry.name}`;
    if (entry.isDirectory()) {
      files.push(...(await walk(child)));
    } else if (hasAllowedExtension(entry.name)) {
      files.push(child);
    }
  }

  return files;
}

const files = [];
for (const root of roots) files.push(...(await walk(root)));

const matches = [];
for (const file of files) {
  const text = await readFile(new URL(`../${file}`, import.meta.url), "utf8");
  const lines = text.split(/\r?\n/);

  lines.forEach((line, index) => {
    for (const pattern of forbidden) {
      if (pattern.test(line)) {
        matches.push(`${file}:${index + 1}: ${line.trim()}`);
      }
    }
  });
}

if (matches.length > 0) {
  console.error(`Placeholder markers found:\n${matches.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`No placeholder markers found (${files.length} files scanned)`);
}
