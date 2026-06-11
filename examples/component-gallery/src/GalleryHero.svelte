<script>
  import { Button, ButtonSet } from "../../../src/index.js";
</script>

<section class="hero">
  <p class="eyebrow">MaxCraft UI</p>
  <h1>Component Gallery</h1>
  <p>Carbon-compatible Svelte components with MaxCraft visual states.</p>
  <ButtonSet>
    <Button>主操作</Button>
    <Button kind="secondary">次操作</Button>
    <Button kind="tertiary">三层操作</Button>
    <Button kind="ghost">幽灵操作</Button>
    <Button kind="danger">危险操作</Button>
    <Button disabled>禁用</Button>
  </ButtonSet>
</section>

<style>
  .hero {
    display: grid;
    min-width: 0;
    gap: 1rem;
  }

  .hero h1,
  .hero p {
    margin: 0;
  }

  .eyebrow {
    color: var(--cds-text-02);
    font-size: 0.875rem;
    font-weight: 800;
  }
</style>
