# @ifloppy/maxcraftmc-ui-svelte

MaxCraft themed compatibility build of `carbon-components-svelte@0.108.0`.

This package intentionally preserves the Carbon Svelte 0.108.0 component names,
exports, CSS entrypoints, types, props, events, and slot surface so existing
Svelte apps can migrate with minimal source changes.

## What This Package Is

`@ifloppy/maxcraftmc-ui-svelte` is the shared UI foundation for MaxCraft web
projects:

- Svelte component library compatible with `carbon-components-svelte@0.108.0`
- MaxCraft Minecraft-styled theme layer for Carbon class names
- CSS/token entrypoints that Hugo themes can reuse without Svelte
- Public package intended for MPCenter, MaxCraft Wiki, and future sites

The implementation is derived from Carbon Svelte 0.108.0 under Apache-2.0. The
theme tokens and visual overrides are MaxCraft-specific.

## AI Generated Notice

This project was generated entirely by AI. Treat it as experimental software:
review the source, dependency behavior, accessibility, security, and licensing
fit before using it in production. MaxCraft-specific styling and compatibility
claims should be validated in each consuming application.

## Install

```sh
npm install @ifloppy/maxcraftmc-ui-svelte carbon-icons-svelte
```

For applications that already import `carbon-components-svelte`, use an npm
alias after the package is published:

```json
{
  "dependencies": {
    "carbon-components-svelte": "npm:@ifloppy/maxcraftmc-ui-svelte@0.2.0",
    "carbon-icons-svelte": "^13.5.0"
  }
}
```

## CSS

Svelte applications can keep the original Carbon CSS import and add the
MaxCraft theme layer:

```js
import "carbon-components-svelte/css/all.css";
import "carbon-components-svelte/css/maxcraft.css";
```

Hugo themes can mount this package's `css/` directory and include
`maxcraft.css` through Hugo Pipes.

## Docs

- [Installation](docs/installation.md)
- [Svelte migration guide](docs/svelte-migration.md)
- [Hugo integration guide](docs/hugo-integration.md)
- [Theme tokens](docs/theme-tokens.md)
- [Component catalog](docs/component-catalog.md)
- [Consumer migration checklist](docs/consumer-checklist.md)
- [Compatibility policy](docs/compatibility.md)
- [Contributing](docs/contributing.md)
- [Publishing and maintenance](docs/publishing.md)
- [Changelog](CHANGELOG.md)

## Quick Example

```svelte
<script>
  import { Theme, Button, ClickableTile } from "carbon-components-svelte";
  import "carbon-components-svelte/css/all.css";
  import "carbon-components-svelte/css/maxcraft.css";
</script>

<Theme theme="white">
  <ClickableTile href="/posts/address/">
    <h3>服务器地址</h3>
    <p>查看 Java / Bedrock 连接信息。</p>
  </ClickableTile>
  <Button href="/login">进入个人中心</Button>
</Theme>
```

More examples live in [examples](examples/).

## Verification

```sh
npm run check
npm run build
```

`npm run check` verifies that the public API exports and required CSS entrypoints
exist. `npm run build` also runs `npm pack --dry-run` to prove the package can be
published.

## Attribution

The component source and type surface are derived from
`carbon-components-svelte@0.108.0`, licensed under Apache-2.0. MaxCraft theme
tokens and CSS customizations are maintained by MaxCraftMC.
