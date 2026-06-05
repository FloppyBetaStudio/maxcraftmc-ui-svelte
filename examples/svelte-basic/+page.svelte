<script>
  import {
    Button,
    ButtonSet,
    Checkbox,
    ClickableTile,
    Header,
    HeaderUtilities,
    HeaderGlobalAction,
    Content,
    NumberInput,
    PaginationNav,
    PasswordInput,
    RadioButton,
    RadioButtonGroup,
    Select,
    SelectItem,
    TextInput,
    Toggle,
    ToastNotification,
  } from "carbon-components-svelte";
  import Home from "carbon-icons-svelte/lib/Home.svelte";

  let slots = 6;
  let enabled = true;
  let checked = true;
  let mode = "survival";
  let page = 4;
  let region = "spawn";
</script>

<Header company="MaxCraftMC" platformName="Example" href="/">
  <HeaderUtilities>
    <HeaderGlobalAction icon={Home} iconDescription="首页" href="/" />
  </HeaderUtilities>
</Header>

<Content>
  <section class="demo">
    <div class="intro">
      <p class="eyebrow">MaxCraft UI</p>
      <h1>Carbon-compatible Svelte components</h1>
      <p>Use Carbon component names with MaxCraft styling.</p>
      <ButtonSet>
        <Button href="/login">进入个人中心</Button>
        <Button kind="secondary" href="/posts/address/">服务器地址</Button>
        <Button kind="tertiary" href="/posts/guide/">新玩家指南</Button>
      </ButtonSet>
    </div>

    <div class="grid">
      <ClickableTile href="/posts/guide/">
        <h3>新玩家指南</h3>
        <p>查看入服前需要了解的资料。</p>
      </ClickableTile>

      <ClickableTile href="/posts/address/">
        <h3>服务器地址</h3>
        <p>选择线路并复制连接信息。</p>
      </ClickableTile>
    </div>

    <div class="panel">
      <TextInput labelText="Minecraft ID" placeholder="Steve" />
      <PasswordInput labelText="指令令牌" placeholder="token" />
      <Select labelText="目标区域" bind:selected={region}>
        <SelectItem value="spawn" text="主城" />
        <SelectItem value="nether" text="下界交通" />
        <SelectItem value="end" text="末地大厅" />
      </Select>
      <NumberInput
        label="玩家席位"
        min={1}
        max={12}
        bind:value={slots}
        iconDescription="调整席位"
      />
    </div>

    <div class="panel controls">
      <Toggle labelText="启用白名单" bind:toggled={enabled} />
      <Toggle size="sm" hideLabel labelText="快速开关" bind:toggled={enabled} />
      <Checkbox labelText="记住这个设备" bind:checked />
      <RadioButtonGroup legendText="游戏模式" bind:selected={mode}>
        <RadioButton value="survival" labelText="生存" />
        <RadioButton value="creative" labelText="创造" />
        <RadioButton value="spectator" labelText="旁观" />
      </RadioButtonGroup>
    </div>

    <div class="panel">
      <PaginationNav total={18} shown={6} bind:page />
    </div>

    <ToastNotification
      title="已应用主题"
      subtitle="组件仍使用 Carbon Svelte API。"
      kind="success"
      hideCloseButton
    />
  </section>
</Content>

<style>
  .demo {
    display: grid;
    max-width: 64rem;
    gap: 1.25rem;
  }

  .eyebrow {
    margin-bottom: 0.5rem;
    color: var(--cds-text-02);
    font-size: 0.875rem;
    font-weight: 800;
  }

  .intro {
    display: grid;
    gap: 0.75rem;
  }

  .intro h1,
  .intro p {
    margin: 0;
  }

  .grid,
  .panel {
    display: grid;
    min-width: 0;
    gap: 1rem;
  }

  .grid {
    grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr));
  }

  .panel {
    padding: 1rem;
    border: 4px solid var(--mc-border, #3b2f24);
    background: var(--cds-layer, #ffffff);
    box-shadow: 0 6px 0 rgb(0 0 0 / 0.16);
  }

  .controls {
    grid-template-columns: repeat(auto-fit, minmax(min(12rem, 100%), 1fr));
    align-items: start;
  }
</style>
