import { readdir, readFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { relative } from "node:path";

const roots = ["src", "css"];
const ignoredFiles = new Set(["maxcraft.css"]);
const intentionalOverrides = new Map([
  ["src/ComposedModal/ComposedModal.svelte", "31f133d894fb23148527e59a3b717947b40cbb1f5b5ccc2666ca62890e701131"],
  ["src/ComposedModal/ComposedModal.svelte.d.ts", "960bec7cd38a1da45e7051a9ef9615b501e4d5cc738e9c936a067fa1d76626b8"],
  ["src/DatePicker/DatePickerInput.svelte", "833c5773aeb8067790b41e012688f65c113771e0af3b6814abbc2f592b4ff597"],
  ["src/Modal/Modal.svelte", "b7f65bf3a56a4bedfcfb23ba41c1347a8c371c13774fb1067d1b5de14cf119a2"],
  ["src/Modal/Modal.svelte.d.ts", "95b48a6d8de2ecb30b34142bb5837befd9cdc06be7fd4d98e002401b7d718718"],
  ["src/TooltipIcon/TooltipIcon.svelte", "06305e960730d57b7dc2a8c0e890f11eb969a2f46b29bd9e3f65edde8379a353"],
  ["src/TooltipIcon/TooltipIcon.svelte.d.ts", "092d0ecf49207c419fc374b5b99e14503681abeb6ee2962c92adf48030cb729d"],
]);

async function listFiles(rootUrl, baseUrl = rootUrl) {
  const entries = await readdir(rootUrl, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryUrl = new URL(entry.name, rootUrl);
    if (entry.isDirectory()) {
      files.push(...await listFiles(new URL(`${entry.name}/`, rootUrl), baseUrl));
    } else {
      const file = relative(new URL(".", baseUrl).pathname, entryUrl.pathname).replaceAll("\\", "/");
      if (!ignoredFiles.has(file)) files.push(file);
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

    const expectedOverrideHash = intentionalOverrides.get(`${root}/${file}`);
    if (expectedOverrideHash) {
      const local = await readFile(localUrl);
      const actualHash = createHash("sha256").update(local).digest("hex");
      if (actualHash !== expectedOverrideHash) {
        problems.push(`${root}/${file}: intentional override changed`);
      }
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
  console.log(
    `Upstream definitions OK (${roots.join(", ")}; ${intentionalOverrides.size} intentional overrides)`,
  );
}
