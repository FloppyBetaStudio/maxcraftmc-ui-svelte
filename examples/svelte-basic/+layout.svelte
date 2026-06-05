<script>
  import { Theme } from "carbon-components-svelte";
  import "carbon-components-svelte/css/all.css";
  import "carbon-components-svelte/css/maxcraft.css";

  export let data;
</script>

<Theme theme={data?.dark ? "g100" : "white"}>
  <slot />
</Theme>
