<script>
  import {
    Checkbox,
    CheckboxGroup,
    ComboBox,
    ContextMenu,
    ContextMenuDivider,
    ContextMenuGroup,
    ContextMenuOption,
    ContextMenuRadioGroup,
    Dropdown,
    MultiSelect,
    OverflowMenu,
    OverflowMenuItem,
    RadioButton,
    RadioButtonGroup,
    SelectableTag,
    Stack,
    Tag,
    Toggle,
  } from "../../../src/index.js";

  export let items = [];
  export let dropdownOpen = false;
  export let comboOpen = false;
  export let multiOpen = false;
  export let toggleOn = true;
  export let checked = true;
  export let groupChoices = [];
  export let mode = "survival";
  export let overflowOpen = false;
  export let contextOpen = false;
  export let selectedTags = true;
</script>

<section class="surface">
  <h2>Choices And Menus</h2>
  <div class="grid">
    <Dropdown titleText="Dropdown" label="选择服务器" {items} bind:open={dropdownOpen} selectedId="survival" />
    <ComboBox titleText="ComboBox" placeholder="输入服务器" {items} bind:open={comboOpen} selectedId="creative" />
    <MultiSelect titleText="MultiSelect" label="选择多个区域" {items} selectedIds={["survival"]} bind:open={multiOpen} />
    <MultiSelect titleText="Filterable MultiSelect" label="筛选区域" {items} filterable selectedIds={["creative"]} />
    <Toggle labelText="启用白名单" bind:toggled={toggleOn} />
    <Toggle size="sm" labelText="小号开关" bind:toggled={toggleOn} />
    <Checkbox labelText="记住设备" bind:checked />
    <Checkbox labelText="禁用复选框" disabled checked />
    <CheckboxGroup legendText="通知偏好" bind:selected={groupChoices} helperText="CheckboxGroup 覆盖 0.108 组态。">
      <Checkbox value="remember" labelText="记住设备" />
      <Checkbox value="alerts" labelText="维护提醒" />
      <Checkbox value="readonly" labelText="只读选项" readonly />
    </CheckboxGroup>
    <RadioButtonGroup legendText="模式" bind:selected={mode}>
      <RadioButton value="survival" labelText="生存" />
      <RadioButton value="creative" labelText="创造" />
      <RadioButton value="spectator" labelText="旁观" disabled />
    </RadioButtonGroup>
    <OverflowMenu bind:open={overflowOpen} flipped>
      <OverflowMenuItem text="编辑" />
      <OverflowMenuItem text="禁用项" disabled />
      <OverflowMenuItem text="删除" danger />
    </OverflowMenu>
    <div class="context-target">
      <p>ContextMenu target</p>
      <ContextMenu open={contextOpen} x={24} y={24}>
        <ContextMenuOption labelText="刷新" shortcutText="R" selected selectable />
        <ContextMenuGroup>
          <ContextMenuOption id="copy" labelText="复制" selected />
          <ContextMenuOption id="paste" labelText="粘贴" />
        </ContextMenuGroup>
        <ContextMenuRadioGroup>
          <ContextMenuOption id="fast" labelText="快速" selected />
          <ContextMenuOption id="safe" labelText="安全" />
        </ContextMenuRadioGroup>
        <ContextMenuDivider />
        <ContextMenuOption labelText="危险操作" kind="danger" />
      </ContextMenu>
    </div>
  </div>
  <Stack orientation="horizontal" gap={4} align="center" class="tag-stack">
    <SelectableTag type="green" bind:selected={selectedTags}>在线</SelectableTag>
    <SelectableTag type="outline">可加入</SelectableTag>
    <SelectableTag type="gray" disabled>维护中</SelectableTag>
    <Tag type="cyan">Tag</Tag>
  </Stack>
</section>

<style>
  .surface {
    display: grid;
    min-width: 0;
    gap: 1rem;
    padding: 1rem;
    border: 4px solid var(--mc-border);
    background: var(--cds-layer);
    box-shadow: var(--mc-shadow-block);
  }

  .surface h2,
  .surface p {
    margin: 0;
  }

  .grid {
    display: grid;
    min-width: 0;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr));
    align-items: start;
  }

  .context-target {
    position: relative;
    min-height: 13rem;
    padding: 1rem;
    border: 3px dashed var(--mc-border);
  }

  :global(.tag-stack) {
    flex-wrap: wrap;
  }

  @media (max-width: 48rem) {
    .surface {
      padding: 0.75rem;
    }
  }
</style>
