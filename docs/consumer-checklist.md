# Consumer Migration Checklist

Use this checklist when connecting a Svelte or Hugo consumer to
`@ifloppy/maxcraftmc-ui-svelte`.

## Svelte Consumer

- Replace `carbon-components-svelte` with
  `npm:@ifloppy/maxcraftmc-ui-svelte@<version>`.
- Keep `carbon-icons-svelte` installed.
- Remove `carbon-components` unless the app imports it directly.
- Import `carbon-components-svelte/css/all.css` once in the root layout.
- Import `carbon-components-svelte/css/maxcraft.css` once after `all.css`.
- Keep existing component imports unchanged when using the alias.
- Run `npm install --ignore-scripts`.
- Run `npm run check`.
- Run `npm run build`.
- Manually verify navigation, form controls, modals, notifications, tiles, tags,
  and dark mode.
- Because this package was generated entirely by AI, review source behavior,
  accessibility, security, and compatibility in the consumer app before
  production use.

## Hugo Consumer

- Import `github.com/FloppyBetaStudio/maxcraftmc-ui-svelte` as a Hugo module and mount
  its `css` directory to `assets/maxcraft-ui`.
- If adding project-level mounts, explicitly restore default mounts for
  `assets`, `content`, `layouts`, `static`, and any other site folders in use.
- Include `maxcraft-ui/maxcraft.css` before site-specific CSS.
- Keep page-specific layout and animation CSS in the consumer site.
- Prefer shared `--mc-*` tokens for new theme styles.
- Run `hugo --gc --minify`.
- Confirm generated HTML links a fingerprinted `maxcraft` stylesheet.

## Release Consumer

- Update the consumer lockfile after changing package versions.
- Run consumer checks after every package version bump.
- Check for accidental duplicate CSS imports.
- Keep `carbon-icons-svelte` version compatible with the consuming app.
