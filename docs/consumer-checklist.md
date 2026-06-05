# Consumer Migration Checklist

Use this checklist when connecting a Svelte or Hugo consumer to
`@maxcraftmc/carbon-svelte`.

## Svelte Consumer

- Replace `carbon-components-svelte` with a local file alias during development:
  `file:../maxcraft-ui`.
- Replace the local alias with `npm:@maxcraftmc/carbon-svelte@<version>` after
  publishing.
- Keep `carbon-icons-svelte` installed.
- Remove `carbon-components` unless the app imports it directly.
- Import `carbon-components-svelte/css/all.css` once in the root layout.
- Import `carbon-components-svelte/css/maxcraft.css` once after `all.css`.
- Keep existing component imports unchanged when using the alias.
- Run `npm install --ignore-scripts`.
- During local file-link development, also run `npm install --ignore-scripts`
  inside `maxcraft-ui`.
- Run `npm run check`.
- Run `npm run build`.
- Manually verify navigation, form controls, modals, notifications, tiles, tags,
  and dark mode.

## Hugo Consumer

- Mount `../maxcraft-ui/css` to `assets/maxcraft-ui`.
- If adding project-level mounts, explicitly restore default mounts for
  `assets`, `content`, `layouts`, `static`, and any other site folders in use.
- Include `maxcraft-ui/maxcraft.css` before site-specific CSS.
- Keep page-specific layout and animation CSS in the consumer site.
- Prefer shared `--mc-*` tokens for new theme styles.
- Run `hugo --gc --minify`.
- Confirm generated HTML links a fingerprinted `maxcraft` stylesheet.

## Release Consumer

- Update the consumer lockfile after changing from `file:` to `npm:`.
- Run consumer checks after every package version bump.
- Check for accidental duplicate CSS imports.
- Keep `carbon-icons-svelte` version compatible with the consuming app.
