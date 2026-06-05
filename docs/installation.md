# Installation

This package supports two consumption modes:

- Svelte apps use the Carbon-compatible component entrypoint.
- Hugo/static sites use the CSS/token entrypoints.

## Published Package

This project was generated entirely by AI. Review the code, behavior,
accessibility, security, and licensing fit before relying on it in production.

Install the package and keep `carbon-icons-svelte` as the icon source:

```sh
npm install @ifloppy/maxcraftmc-ui-svelte carbon-icons-svelte
```

For a new Svelte app, import directly:

```js
import { Button } from "@ifloppy/maxcraftmc-ui-svelte";
import "@ifloppy/maxcraftmc-ui-svelte/css/all.css";
import "@ifloppy/maxcraftmc-ui-svelte/css/maxcraft.css";
```

For an existing Carbon Svelte app, use an alias so source imports can stay
unchanged:

```json
{
  "dependencies": {
    "carbon-components-svelte": "npm:@ifloppy/maxcraftmc-ui-svelte@0.1.2",
    "carbon-icons-svelte": "^13.5.0"
  }
}
```

Existing imports continue to work:

```js
import { Button, Theme } from "carbon-components-svelte";
import "carbon-components-svelte/css/all.css";
import "carbon-components-svelte/css/maxcraft.css";
```

## Required CSS Entrypoints

The package preserves Carbon's original CSS entrypoints:

- `css/all.css`
- `css/white.css`
- `css/g10.css`
- `css/g80.css`
- `css/g90.css`
- `css/g100.css`

MaxCraft-specific entrypoints:

- `css/maxcraft.css`
- `tokens/maxcraft.css`

Use `all.css` plus `maxcraft.css` for Svelte apps. Use only `maxcraft.css` for
Hugo/static sites that already have their own reset and prose styles.
