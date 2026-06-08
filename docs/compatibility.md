# Compatibility Policy

The compatibility target is fixed to `carbon-components-svelte@0.108.0`.

## Guaranteed Surface

This package preserves:

- `src/index.js` named exports
- `src/index.d.ts` named exports
- component directory names
- component file names
- CSS entrypoints under `css/`
- common props, events, slots, and rest-prop behavior inherited from Carbon
  Svelte 0.108.0

The API check script compares the package exports against the type export list:

```sh
npm run check
```

The same command also builds a temporary Svelte/Vite app that imports
representative components and CSS from this package. This catches missing
runtime dependencies and broken Svelte entrypoints that text-only export checks
cannot see.

## Non-Goals

- This package does not track newer Carbon packages such as `@carbon/*`.
- This package does not replace `carbon-icons-svelte`.
- This package does not guarantee visual parity with IBM Carbon; MaxCraft visual
  language is the intended output.
- This package does not provide a human-authored guarantee of correctness. It
  was generated entirely by AI and must be reviewed before production use.

## Adding Or Changing Components

Before changing a component API:

1. Compare against `carbon-components-svelte@0.108.0`.
2. Preserve existing prop/event/slot names unless a breaking release is planned.
3. Run `npm run check`.

If a component needs MaxCraft-specific behavior, prefer CSS/token customization
first. Add new props only when CSS cannot express the requirement.

## Versioning

Use semantic versioning:

- Patch: style fixes, docs, compatibility bug fixes
- Minor: new MaxCraft styling hooks or non-breaking helper exports
- Major: breaking API changes against Carbon Svelte 0.108.0
