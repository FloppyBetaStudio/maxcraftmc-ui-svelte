# Contributing

This package is both a compatibility layer and a MaxCraft design system. Treat
compatibility as the default constraint.

## Development Setup

```sh
npm install --ignore-scripts
npm run check
```

When developing against `mpc-web`:

```sh
cd ../mpc-web
npm install --ignore-scripts
npm run check
```

## What To Change First

- For visual work, prefer `tokens/maxcraft.css` and `css/maxcraft.css`.
- For API fixes, compare against `carbon-components-svelte@0.89.4`.
- For docs, update README links and run `npm run check`.
- For consumer integration, update the relevant consumer docs and checklist.

## Compatibility Rules

- Do not rename exported components.
- Do not remove props, events, slots, or CSS entrypoints that exist in Carbon
  Svelte 0.89.4.
- Do not replace `carbon-icons-svelte`.
- Do not introduce framework support beyond Svelte unless the package scope is
  explicitly changed.
- Keep Hugo CSS reusable without requiring Svelte.

## CSS Rules

- Keep `css/maxcraft.css` self-contained.
- Keep `tokens/maxcraft.css` focused on reusable design tokens.
- Prefer `--mc-*` tokens over hard-coded colors.
- Prefer CSS overrides over component API changes.
- Preserve square, block-like UI affordances for shared controls.

## Verification

Run from `maxcraft-ui`:

```sh
npm run check
npm run build
```

The local checks cover:

- exact export parity with `carbon-components-svelte@0.89.4`
- export target existence
- a Vite/Svelte smoke build with representative components
- placeholder/stub marker scanning
- CSS entrypoint existence
- documentation and README link integrity

Run consumers when shared CSS or package metadata changes:

```sh
cd ../mpc-web
npm run check
npm run build

cd ../maxcraftmc-wiki
hugo --gc --minify
```

## GitNexus

When editing existing symbols, run impact analysis before changes and
`gitnexus detect-changes` before committing. Documentation-only changes usually
do not map to symbols, but still run detect-changes before commit when the root
repository requires it.
