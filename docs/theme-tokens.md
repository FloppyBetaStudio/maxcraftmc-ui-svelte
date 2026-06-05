# Theme Tokens

MaxCraft theme tokens live in:

- `tokens/maxcraft.css`: token source for package consumers and future tooling
- `css/maxcraft.css`: self-contained browser stylesheet for Svelte and Hugo

## Core Tokens

| Token | Meaning |
| --- | --- |
| `--mc-bedrock` | dark neutral surface |
| `--mc-bedrock-dark` | deepest surface |
| `--mc-border` | hard pixel/block border |
| `--mc-grass` | primary action green |
| `--mc-grass-dark` | primary hover/active green |
| `--mc-dirt` | section separator and earthy accent |
| `--mc-stone` | neutral border/accent |
| `--mc-stone-light` | light neutral |
| `--mc-gold` | warning/accent |
| `--mc-diamond` | focus/accent |
| `--mc-redstone` | danger/progress/accent |
| `--mc-ink` | light-theme text |
| `--mc-paper` | light-theme page background |

## Carbon Token Mapping

`css/maxcraft.css` maps common Carbon custom properties to MaxCraft values:

- `--cds-interactive-01`: primary action
- `--cds-interactive-02`: secondary action
- `--cds-interactive-04`: focus/accent action
- `--cds-background`: page background
- `--cds-ui-01` through `--cds-ui-05`: surfaces and high-contrast text/icon
- `--cds-text-01` through `--cds-text-04`: text roles
- `--cds-icon-01`, `--cds-icon-02`: icon roles
- `--cds-link-01`: links
- `--cds-focus`: focus ring
- `--cds-hover-ui`, `--cds-selected-ui`: interaction states

## Theme Names

The package keeps Carbon theme names and maps them to MaxCraft light/dark modes:

| Carbon theme | MaxCraft mode |
| --- | --- |
| `white` | light |
| `g10` | light |
| `g80` | dark |
| `g90` | dark |
| `g100` | dark |

## Styling Guidance

- Use square corners for shared controls.
- Use `--mc-border` and inset/block shadows for Minecraft-style affordance.
- Use `--mc-grass` for primary actions and `--mc-redstone` for destructive or
  urgent states.
- Keep page-specific decorative effects in consumer apps, not in the shared
  component library.
