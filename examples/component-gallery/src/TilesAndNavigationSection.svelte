<script>
  import {
    Breadcrumb,
    BreadcrumbItem,
    ClickableTile,
    ExpandableTile,
    PaginationNav,
    RadioTile,
    SelectableTile,
    SelectableTileGroup,
    SideNav,
    SideNavItems,
    SideNavLink,
    SideNavMenu,
    SideNavMenuItem,
    Tab,
    TabContent,
    Tabs,
    Tile,
    TileGroup,
  } from "../../../src/index.js";

  export let tile = "grass";
  export let selectedTileValues = [];
  export let tab = 0;
  export let pageNav = 4;
</script>

<section class="surface">
  <h2>Tiles And Navigation</h2>
  <div class="tiles">
    <Tile><h3>普通 Tile</h3><p>基础信息块。</p></Tile>
    <ClickableTile href="#inputs"><h3>ClickableTile</h3><p>Hover 和 active 有方块按压反馈。</p></ClickableTile>
    <SelectableTile value="diamond" selected><h3>SelectableTile</h3><p>选中态。</p></SelectableTile>
    <ExpandableTile tileCollapsedIconText="展开" tileExpandedIconText="收起">
      <h3 slot="above-the-fold">ExpandableTile</h3>
      <p slot="below-the-fold">展开后的内容。</p>
    </ExpandableTile>
  </div>
  <TileGroup legendText="方块类型" bind:selected={tile}>
    <RadioTile value="grass"><h3>草方块</h3></RadioTile>
    <RadioTile value="diamond"><h3>钻石</h3></RadioTile>
  </TileGroup>
  <SelectableTileGroup legendText="多选方块" bind:selected={selectedTileValues}>
    <div class="tiles">
      <SelectableTile value="coal"><h3>煤矿</h3><p>SelectableTileGroup 选中态。</p></SelectableTile>
      <SelectableTile value="emerald"><h3>绿宝石</h3><p>多选组同步。</p></SelectableTile>
    </div>
  </SelectableTileGroup>
  <Breadcrumb>
    <BreadcrumbItem href="/">首页</BreadcrumbItem>
    <BreadcrumbItem href="/wiki">Wiki</BreadcrumbItem>
    <BreadcrumbItem isCurrentPage>组件</BreadcrumbItem>
  </Breadcrumb>
  <Tabs bind:selected={tab}>
    <Tab label="概览" />
    <Tab label="禁用" disabled />
    <Tab label="设置" />
    <svelte:fragment slot="content">
      <TabContent><p>Tab content one.</p></TabContent>
      <TabContent><p>Tab content two.</p></TabContent>
      <TabContent><p>Tab content three.</p></TabContent>
    </svelte:fragment>
  </Tabs>
  <PaginationNav total={12} shown={7} bind:page={pageNav} />
  <SideNav fixed isOpen ariaLabel="Gallery side nav">
    <SideNavItems>
      <SideNavLink href="#inputs" text="输入" />
      <SideNavMenu title="管理">
        <SideNavMenuItem href="#data" text="数据" />
        <SideNavMenuItem href="#feedback" text="反馈" />
      </SideNavMenu>
    </SideNavItems>
  </SideNav>
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
  .surface h3,
  .surface p {
    margin: 0;
  }

  .tiles {
    display: grid;
    min-width: 0;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(min(15rem, 100%), 1fr));
    align-items: start;
  }

  :global(.gallery .bx--side-nav) {
    position: relative;
    transform: none;
    width: min(16rem, 100%);
    height: auto;
    min-height: 12rem;
  }

  :global(.gallery .bx--side-nav__navigation) {
    position: relative;
  }

  @media (max-width: 48rem) {
    .surface {
      padding: 0.75rem;
    }
  }
</style>
