# Publishing And Maintenance

## Repository

The intended public repository is:

```sh
github1:FloppyBetaStudio/maxcraft-ui.git
```

The root `mpc-solution` repository tracks this directory as a Git submodule.

## Pre-Publish Checks

Run from `maxcraft-ui`:

```sh
npm install --ignore-scripts
npm run check
npm run build
```

`npm run build` performs a dry-run package build with `npm pack --dry-run`.
The check step verifies API parity, export targets, a Vite/Svelte smoke build,
placeholder markers, CSS entrypoints, and documentation links.

Also verify consumers:

```sh
cd ../mpc-web
npm install --ignore-scripts
npm run check
npm run build

cd ../maxcraftmc-wiki
hugo --gc --minify
```

## Publish

After the package is ready:

```sh
npm publish --access public
```

Then update consumers from local file aliases to npm aliases:

```json
{
  "dependencies": {
    "carbon-components-svelte": "npm:@maxcraftmc/carbon-svelte@0.1.0"
  }
}
```

## Attribution Requirements

Keep these files in every published package:

- `LICENSE`
- `NOTICE`
- `README.md`

Do not remove Carbon Svelte attribution. The source and type surface are derived
from `carbon-components-svelte@0.89.4`, which is Apache-2.0 licensed.

## Maintenance Checklist

- Keep `css/maxcraft.css` self-contained for Hugo.
- Keep `tokens/maxcraft.css` as the token source for future tooling.
- Run API and CSS entrypoint checks before every release.
- Test `mpc-web` and `maxcraftmc-wiki` before bumping the package version.
- Avoid introducing a dependency on Carbon icons beyond `carbon-icons-svelte`.
