# Hugo Integration Guide

Hugo sites do not use Svelte components from this package. They reuse the CSS
theme layer and design tokens.

## 1. Mount The CSS Directory

Initialize the Hugo site as a module if it does not already have `go.mod`:

```sh
hugo mod init github.com/YourOrg/your-site
```

Then import the public MaxCraft UI module and mount its CSS directory:

```toml
[[module.imports]]
path = "github.com/FloppyBetaStudio/maxcraft-ui"

[[module.imports.mounts]]
source = "css"
target = "assets/maxcraft-ui"
```

If the site declares any `module.mounts`, Hugo replaces the default mounts. Add
all required site mounts explicitly:

```toml
[[module.mounts]]
source = "assets"
target = "assets"

[[module.mounts]]
source = "content"
target = "content"

[[module.mounts]]
source = "layouts"
target = "layouts"

[[module.mounts]]
source = "static"
target = "static"
```

Add other project mounts such as `archetypes`, `data`, and `i18n` if the site
uses them.

## 2. Include The Stylesheet

Include `maxcraft.css` before site-specific overrides:

```go-html-template
{{ with resources.Get "maxcraft-ui/maxcraft.css" }}
{{ if hugo.IsProduction }}
{{ $maxcraftUIStyles := . | minify | fingerprint }}
<link rel="stylesheet" href="{{ $maxcraftUIStyles.RelPermalink }}" integrity="{{ $maxcraftUIStyles.Data.Integrity }}" />
{{ else }}
<link rel="stylesheet" href="{{ .RelPermalink }}" />
{{ end }}
{{ end }}
```

For `maxcraftmc-wiki`, the intended order is:

1. Tailbliss/Tailwind base CSS
2. `maxcraft-ui/maxcraft.css`
3. Wiki-specific `css/site.css`

This order gives the wiki the shared tokens while preserving its custom page
layouts and animations.

## 3. Use Shared Tokens

Hugo templates and CSS can use the shared variables directly:

```css
.mc-button-primary {
  background: linear-gradient(#5caf39, var(--mc-grass-dark));
  border-color: var(--mc-border);
}
```

Prefer token names over hard-coded colors for new shared UI styling.

## 4. Build

```sh
hugo mod tidy
hugo --gc --minify
```

Confirm the generated HTML contains a `maxcraft` stylesheet and the output
folder contains a fingerprinted file under `public/maxcraft-ui/`.
