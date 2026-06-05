import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

const packageRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const packageImportRoot = packageRoot.replaceAll("\\", "/");
const root = await mkdtemp(join(packageRoot, ".smoke-"));

try {
  await writeFile(
    join(root, "index.html"),
    '<div id="app"></div><script type="module" src="/App.svelte"></script>',
  );

  await writeFile(
    join(root, "App.svelte"),
    `<script>
      import {
        Theme,
        Button,
        ClickableTile,
        TextInput,
        Dropdown,
        Tag,
        ToastNotification,
      } from "${packageImportRoot}/src/index.js";
      import "${packageImportRoot}/css/all.css";
      import "${packageImportRoot}/css/maxcraft.css";

      const items = [{ id: "java", text: "Java" }, { id: "bedrock", text: "Bedrock" }];
    </script>

    <Theme theme="white">
      <main>
        <Button>进入个人中心</Button>
        <ClickableTile href="/posts/address/">
          <h2>服务器地址</h2>
          <p>Java / Bedrock</p>
        </ClickableTile>
        <TextInput labelText="Minecraft ID" placeholder="Steve" />
        <Dropdown titleText="版本" label="选择版本" {items} />
        <Tag type="green">在线</Tag>
        <ToastNotification kind="success" title="主题已加载" subtitle="MaxCraft UI" hideCloseButton />
      </main>
    </Theme>`,
  );

  await build({
    root,
    logLevel: "silent",
    plugins: [svelte()],
    build: {
      write: false,
      rollupOptions: {
        input: join(root, "index.html"),
      },
    },
  });

  console.log("Vite/Svelte smoke build OK");
} finally {
  await rm(root, { recursive: true, force: true });
}
