# Changelog

## 0.2.1

- Reworked header colors so the light MaxCraft theme uses readable paper and
  grass states instead of a mixed dark Carbon header.
- Centered checked checkbox marks against the MaxCraft block checkbox frame.
- Added gallery visual regression checks for header contrast, checkbox mark
  centering, and pagination label centering.

## 0.2.0

- Updated the compatibility baseline to `carbon-components-svelte@0.108.0`.
- Synced upstream component source, colocated type definitions, and Carbon CSS
  entrypoints.
- Updated package exports to use the upstream `src/*.d.ts` type layout.
- Kept the MaxCraft theme layer as the package-specific visual extension.

## 0.1.3

- Added byte-for-byte upstream sync checks for `src/` and `types/`.
- Refined the MaxCraft theme surfaces, shadows, typography, and data controls
  for calmer operational UI usage.
- Fixed explicit light themes being affected by system dark-mode content
  backgrounds.
- Improved component gallery auditing so it can find Playwright from npm cache
  locations.

## 0.1.2

- Added explicit AI-generated project notices.
- Removed internal/local consumer documentation from the public docs.
- Updated published package metadata and public usage snippets.

## 0.1.0

Initial MaxCraft compatibility package.

- Added full `carbon-components-svelte@0.108.0` component, type, and CSS
  compatibility surface.
- Added `css/maxcraft.css` and `tokens/maxcraft.css`.
- Added API, CSS entrypoint, and docs checks.
- Added Svelte and Hugo usage examples.
- Added documentation for installation, migration, Hugo integration, tokens,
  compatibility, contribution, and publishing.
