# Publishing And Maintenance

## Repository

The intended public repository is:

```sh
https://github.com/FloppyBetaStudio/maxcraftmc-ui-svelte.git
```

## Pre-Publish Checks

Run:

```sh
npm install --ignore-scripts
npm run check
npm run build
```

`npm run build` performs a dry-run package build with `npm pack --dry-run`.
The check step verifies API parity, export targets, a Vite/Svelte smoke build,
placeholder markers, CSS entrypoints, and documentation links.

## Publish

After the package is ready:

```sh
npm publish --access public
```

Then update consumers from local file aliases to npm aliases:

```json
{
  "dependencies": {
    "carbon-components-svelte": "npm:@ifloppy/maxcraftmc-ui-svelte@0.2.0"
  }
}
```

## AI Generated Notice

This package was generated entirely by AI. Each release should be reviewed for
source correctness, accessibility, security, licensing, and compatibility before
production use.

## Attribution Requirements

Keep these files in every published package:

- `LICENSE`
- `NOTICE`
- `README.md`

Do not remove Carbon Svelte attribution. The source and type surface are derived
from `carbon-components-svelte@0.108.0`, which is Apache-2.0 licensed.

## Maintenance Checklist

- Keep `css/maxcraft.css` self-contained for Hugo.
- Keep `tokens/maxcraft.css` as the token source for future tooling.
- Run API and CSS entrypoint checks before every release.
- Avoid introducing a dependency on Carbon icons beyond `carbon-icons-svelte`.
