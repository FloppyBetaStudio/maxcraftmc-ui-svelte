import { readdir, readFile, stat } from "node:fs/promises";
import { relative } from "node:path";

const roots = ["src", "types"];

async function listFiles(rootUrl, baseUrl = rootUrl) {
  const entries = await readdir(rootUrl, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryUrl = new URL(entry.name, rootUrl);
    if (entry.isDirectory()) {
      files.push(...await listFiles(new URL(`${entry.name}/`, rootUrl), baseUrl));
    } else {
      files.push(relative(new URL(".", baseUrl).pathname, entryUrl.pathname).replaceAll("\\", "/"));
    }
  }

  return files;
}

async function compareTree(root) {
  const baselineRoot = new URL(`../node_modules/carbon-components-svelte/${root}/`, import.meta.url);
  const localRoot = new URL(`../${root}/`, import.meta.url);
  const baselineFiles = new Set(await listFiles(baselineRoot));
  const localFiles = new Set(await listFiles(localRoot));
  const allFiles = new Set([...baselineFiles, ...localFiles]);
  const problems = [];

  for (const file of [...allFiles].sort()) {
    const baselineUrl = new URL(file, baselineRoot);
    const localUrl = new URL(file, localRoot);
    const inBaseline = baselineFiles.has(file);
    const inLocal = localFiles.has(file);

    if (!inBaseline || !inLocal) {
      problems.push(`${root}/${file}: ${inBaseline ? "missing locally" : "extra local file"}`);
      continue;
    }

    const [baselineStat, localStat] = await Promise.all([stat(baselineUrl), stat(localUrl)]);
    if (baselineStat.size !== localStat.size) {
      problems.push(`${root}/${file}: size differs`);
      continue;
    }

    const [baseline, local] = await Promise.all([readFile(baselineUrl), readFile(localUrl)]);
    if (!baseline.equals(local)) problems.push(`${root}/${file}: content differs`);
  }

  return problems;
}

const problems = (await Promise.all(roots.map(compareTree))).flat();

if (problems.length > 0) {
  console.error("Upstream definition sync failed:");
  for (const problem of problems) console.error(`- ${problem}`);
  process.exitCode = 1;
} else {
  console.log(`Upstream definitions OK (${roots.join(", ")})`);
}
