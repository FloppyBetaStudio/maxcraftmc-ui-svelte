# Svelte Migration Guide

This guide is for apps already using `carbon-components-svelte@0.89.4`.

## 1. Replace The Dependency

Published package:

```json
{
  "dependencies": {
    "carbon-components-svelte": "npm:@ifloppy/maxcraftmc-ui-svelte@0.1.2",
    "carbon-icons-svelte": "^13.5.0"
  }
}
```

Remove the old `carbon-components` dependency unless the app imports it
directly. `@ifloppy/maxcraftmc-ui-svelte` includes the CSS entrypoints it needs.
This project was generated entirely by AI, so review compatibility and behavior
in the consuming app before production use.

## 2. Keep Component Imports

No source import rewrite is required when using the alias:

```svelte
<script>
  import { Button, Header, Theme } from "carbon-components-svelte";
</script>
```

Direct imports are also supported for new code:

```svelte
<script>
  import { Button, Header, Theme } from "@ifloppy/maxcraftmc-ui-svelte";
</script>
```

## 3. Load CSS Once

Load CSS from the app root layout, not inside individual pages:

```svelte
<script>
  import "carbon-components-svelte/css/all.css";
  import "carbon-components-svelte/css/maxcraft.css";
</script>
```

`all.css` keeps Carbon-compatible structure and base styles. `maxcraft.css`
maps Carbon variables and common `bx--*` classes to MaxCraft visual language.

## 4. Theme Mapping

The `Theme` component still accepts Carbon theme names:

```svelte
<Theme theme={isDarkMode ? "g100" : "white"}>
  <slot />
</Theme>
```

MaxCraft maps them as:

- `white`, `g10`: light
- `g80`, `g90`, `g100`: dark

## 5. Icons

Continue using `carbon-icons-svelte`:

```svelte
<script>
  import Home from "carbon-icons-svelte/lib/Home.svelte";
  import { UserAvatarFilledAlt } from "carbon-icons-svelte";
</script>
```

This UI package does not replace the Carbon icon package.

## 6. Verification Checklist

Run:

```sh
npm run check
npm run build
```

Manually inspect:

- Header and navigation
- Buttons and button sets
- Text inputs and forms
- Dropdowns and modals
- Toast/inline notifications
- Tiles and tags
- Light/dark theme switching
- Mobile layout
