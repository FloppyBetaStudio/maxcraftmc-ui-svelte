<script>
  import {
    Accordion,
    AccordionItem,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    ClickableTile,
    CodeSnippet,
    ContainedList,
    ContainedListItem,
    Content,
    ContentSwitcher,
    CopyButton,
    DataTable,
    ExpandableTile,
    FileUploader,
    FloatingPortal,
    Header,
    HeaderAction,
    HeaderActionLink,
    HeaderGlobalAction,
    HeaderNav,
    HeaderNavItem,
    HeaderNavMenu,
    HeaderPanelLink,
    HeaderPanelLinks,
    HeaderSearch,
    HeaderUtilities,
    InlineLoading,
    InlineNotification,
    Link,
    Modal,
    Loading,
    NotificationQueue,
    OrderedList,
    Pagination,
    PaginationNav,
    Popover,
    Portal,
    ProgressBar,
    ProgressIndicator,
    ProgressStep,
    RadioTile,
    SessionStorage,
    SideNav,
    SideNavItems,
    SideNavLink,
    SideNavMenu,
    SideNavMenuItem,
    SelectableTile,
    SelectableTileGroup,
    SkeletonIcon,
    SkeletonPlaceholder,
    SkeletonText,
    StructuredList,
    StructuredListBody,
    StructuredListCell,
    StructuredListHead,
    StructuredListInput,
    StructuredListRow,
    Switch,
    Tab,
    TabContent,
    Tabs,
    TextArea,
    TextInput,
    Theme,
    Tile,
    TileGroup,
    ToastNotification,
    Tooltip,
    TooltipDefinition,
    TooltipIcon,
    TreeView,
    Truncate,
    UnorderedList,
  } from "../../../src/index.js";
  import ChoicesAndMenusSection from "./ChoicesAndMenusSection.svelte";
  import GalleryHero from "./GalleryHero.svelte";
  import InputsSection from "./InputsSection.svelte";
  import { headers, items, rows, treeNodes } from "./gallery-data.js";
  import "../../../css/all.css";
  import "../../../css/maxcraft.css";

  const theme = new URLSearchParams(location.search).get("theme") === "dark" ? "g100" : "white";
  const dark = theme === "g100";
  if (dark) document.documentElement.classList.add("dark");

  let slots = 6;
  let taxRate = 5;
  let toggleOn = true;
  let checked = true;
  let mode = "survival";
  let tile = "grass";
  let tab = 0;
  let page = 2;
  let pageNav = 4;
  let rangeLow = 20;
  let rangeHigh = 72;
  let dropdownOpen = false;
  let comboOpen = false;
  let multiOpen = false;
  let overflowOpen = false;
  let contextOpen = false;
  let modalOpen = false;
  let headerPanelOpen = false;
  let search = "Steve";
  let headerSearch = "wiki";
  let selectValue = "survival";
  let files = [{ name: "server-config.yml", lastModified: 1 }];
  let selectedTags = true;
  let selectedTileValues = ["coal", "emerald"];
  let groupChoices = ["remember", "alerts"];
  let sessionValue = "gallery-session";
  let floatingAnchor;
  let floatingPortalOpen = false;
  let portalOpen = false;
  let popoverOpen = false;
  let notificationQueue;

  function showQueuedNotification() {
    notificationQueue?.add({
      id: "gallery-sync",
      kind: "success",
      title: "队列通知",
      subtitle: "NotificationQueue 已应用 MaxCraft 样式。",
      timeout: 0,
      hideCloseButton: true,
    });
  }

</script>

<svelte:window on:maxcraft-gallery-open-modal={() => (modalOpen = true)} />

<Theme {theme}>
  <Header company="MaxCraftMC" platformName="UI Gallery" href="/">
    <HeaderNav>
      <HeaderNavItem href="#inputs" text="Inputs" />
      <HeaderNavItem href="#data" text="Data" />
      <HeaderNavItem href="#feedback" text="Feedback" />
      <HeaderNavMenu text="更多" expanded>
        <HeaderNavItem href="#inputs" text="输入" />
        <HeaderNavItem href="#feedback" text="反馈" />
      </HeaderNavMenu>
    </HeaderNav>
    <HeaderUtilities>
      <HeaderSearch
        bind:value={headerSearch}
        results={[
          { href: "#inputs", text: "输入控件", description: "Inputs" },
          { href: "#data", text: "数据组件", description: "Data" },
        ]}
      />
      <HeaderActionLink href="#feedback" linkIsActive aria-label="状态">
        <span slot="icon" class="header-action-label">状态</span>
      </HeaderActionLink>
      <HeaderAction bind:isOpen={headerPanelOpen} text="面板">
        <HeaderPanelLinks>
          <HeaderPanelLink href="#data">服务器数据</HeaderPanelLink>
          <HeaderPanelLink href="#feedback">反馈状态</HeaderPanelLink>
        </HeaderPanelLinks>
      </HeaderAction>
      <HeaderGlobalAction iconDescription="状态" />
    </HeaderUtilities>
  </Header>

  <Content>
    <main class="gallery" data-theme={theme}>
      <GalleryHero />

      <InputsSection
        bind:search
        bind:selectValue
        bind:slots
        bind:taxRate
        bind:rangeLow
        bind:rangeHigh
      />

      <ChoicesAndMenusSection
        {items}
        bind:dropdownOpen
        bind:comboOpen
        bind:multiOpen
        bind:toggleOn
        bind:checked
        bind:groupChoices
        bind:mode
        bind:overflowOpen
        bind:contextOpen
        bind:selectedTags
      />

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

      <section class="surface" id="data">
        <h2>Data</h2>
        <DataTable title="服务器状态" description="表格、复选框、排序和行状态" {headers} {rows} zebra sortable selectable selectedRowIds={["survival"]} />
        <Pagination totalItems={128} pageSize={10} pageSizes={[10, 20, 50]} bind:page />
        <StructuredList selection selected={["economy"]}>
          <StructuredListHead>
            <StructuredListRow head>
              <StructuredListCell head>系统</StructuredListCell>
              <StructuredListCell head>状态</StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            <StructuredListRow value="economy">
              <StructuredListInput value="economy" />
              <StructuredListCell>经济</StructuredListCell>
              <StructuredListCell>开启</StructuredListCell>
            </StructuredListRow>
            <StructuredListRow value="whitelist">
              <StructuredListInput value="whitelist" />
              <StructuredListCell>白名单</StructuredListCell>
              <StructuredListCell>待审核</StructuredListCell>
            </StructuredListRow>
          </StructuredListBody>
        </StructuredList>
        <ContainedList labelText="ContainedList" kind="disclosed" size="lg">
          <ContainedListItem interactive>白名单审核</ContainedListItem>
          <ContainedListItem interactive>资源区重置</ContainedListItem>
          <ContainedListItem>只读公告</ContainedListItem>
        </ContainedList>
        <TreeView labelText="Wiki 导航" {treeNodes} nodes={treeNodes} expandedIds={["root", "systems"]} selectedIds={["economy"]} />
      </section>

      <section class="surface" id="feedback">
        <h2>Feedback</h2>
        <div class="grid">
          <InlineNotification kind="success" title="成功" subtitle="主题已应用。" hideCloseButton />
          <InlineNotification kind="warning" title="警告" subtitle="需要检查配置。" hideCloseButton />
          <ToastNotification kind="info" title="Toast" subtitle="固定宽度，不横向溢出。" hideCloseButton />
          <Loading small withOverlay={false} description="加载中" />
          <InlineLoading status="active" description="正在同步..." />
          <ProgressBar labelText="构建进度" value={68} helperText="Vite build" />
          <ProgressIndicator currentIndex={1}>
            <ProgressStep label="创建" />
            <ProgressStep label="构建" />
            <ProgressStep label="验收" />
          </ProgressIndicator>
          <FileUploader labelTitle="上传配置" labelDescription="显示文件状态" buttonLabel="选择文件" bind:files status="complete" />
          <CodeSnippet type="single">npm install @ifloppy/maxcraftmc-ui-svelte</CodeSnippet>
          <CopyButton text="mc.maxcraft.org" />
          <div class="portal-demo">
            <button class="portal-anchor" bind:this={floatingAnchor} on:click={() => (floatingPortalOpen = !floatingPortalOpen)}>FloatingPortal anchor</button>
            <FloatingPortal anchor={floatingAnchor} open={floatingPortalOpen} intrinsicWidth direction="bottom" gapBottom={8}>
              <div class="portal-surface">FloatingPortal 内容</div>
            </FloatingPortal>
            <Button kind="ghost" size="small" on:click={() => (portalOpen = !portalOpen)}>Portal trigger</Button>
            {#if portalOpen}
              <Portal>
                <div class="portal-surface portal-fixed">Portal 内容</div>
              </Portal>
            {/if}
            <Button size="small" on:click={() => (popoverOpen = !popoverOpen)}>Popover trigger</Button>
            <Popover open={popoverOpen} caret align="bottom-left" relative class="gallery-popover">
              <div class="popover-body">方块风格弹出层</div>
            </Popover>
          </div>
          <TooltipDefinition term="钻石色 focus">键盘焦点统一用 diamond token。</TooltipDefinition>
          <TooltipIcon tooltipText="图标 tooltip" />
          <Link href="#inputs">锚点链接</Link>
          <div class="truncate-demo">
            <Truncate>这是一段会被截断的 MaxCraft UI 文本，用来覆盖 Truncate 组件。</Truncate>
          </div>
        </div>
        <div class="grid">
          <SkeletonText paragraph lineCount={3} />
          <SkeletonPlaceholder />
          <SkeletonIcon size={32} />
        </div>
        <Button kind="tertiary" on:click={showQueuedNotification}>显示队列通知</Button>
        <NotificationQueue bind:this={notificationQueue} offsetTop="4rem" />
        <SessionStorage key="maxcraft-gallery-session" bind:value={sessionValue} />
        <Accordion>
          <AccordionItem title="Accordion Item" open>折叠面板内容。</AccordionItem>
          <AccordionItem title="Disabled Item" disabled>不可交互内容。</AccordionItem>
        </Accordion>
        <UnorderedList>
          <li>方块边框</li>
          <li>钻石焦点</li>
        </UnorderedList>
        <OrderedList>
          <li>构建</li>
          <li>审计</li>
        </OrderedList>
        <ContentSwitcher>
          <Switch text="白天" />
          <Switch text="夜晚" />
        </ContentSwitcher>
      </section>

      <Modal
        bind:open={modalOpen}
        modalHeading="Modal"
        modalLabel="Component state"
        primaryButtonText="确认"
        secondaryButtonText="取消"
        hasForm
      >
        <TextInput labelText="弹窗输入" value="Steve" />
        <TextArea labelText="弹窗错误说明" value="Too short" invalid invalidText="请补充说明" />
      </Modal>
    </main>
  </Content>
</Theme>

<style>
  :global(body) {
    margin: 0;
  }

  .gallery {
    display: grid;
    max-width: 78rem;
    gap: 1.25rem;
  }

  .surface {
    display: grid;
    min-width: 0;
    gap: 1rem;
  }

  .surface h2,
  .surface h3,
  .surface p {
    margin: 0;
  }

  .surface {
    padding: 1rem;
    border: 4px solid var(--mc-border);
    background: var(--cds-layer);
    box-shadow: var(--mc-shadow-block);
  }

  .grid,
  .tiles {
    display: grid;
    min-width: 0;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr));
    align-items: start;
  }

  .tiles {
    grid-template-columns: repeat(auto-fit, minmax(min(15rem, 100%), 1fr));
  }

  .popover-body {
    min-width: 12rem;
    padding: 1rem;
    font-weight: 800;
  }

  :global(.gallery-popover) {
    width: min(100%, 18rem);
    min-width: 0;
  }

  .truncate-demo {
    width: min(100%, 32rem);
    min-width: 0;
    max-width: 100%;
    align-self: start;
  }

  :global(.header-action-label) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    font-weight: 850;
  }

  .portal-demo {
    display: grid;
    min-width: 0;
    gap: 0.75rem;
    align-items: start;
  }

  .portal-surface {
    min-width: 12rem;
    padding: 0.75rem;
    border: 3px solid var(--mc-border);
    background: var(--cds-layer);
    box-shadow: var(--mc-shadow-block);
    color: var(--cds-text-01);
    font-weight: 850;
  }

  .portal-anchor {
    min-height: 2.5rem;
    margin-bottom: 3.5rem;
    padding: 0 1rem;
    border: 3px solid var(--mc-border);
    background: linear-gradient(var(--cds-layer, #ffffff), var(--cds-field, #d5d1c3));
    box-shadow: var(--mc-shadow-block);
    color: var(--cds-text-01);
    font: inherit;
    font-weight: 850;
  }

  .portal-fixed {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    z-index: 1;
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

  :global(.bx--modal .bx--form-item + .bx--form-item) {
    margin-top: 1rem;
  }

  @media (max-width: 48rem) {
    .surface {
      padding: 0.75rem;
    }
  }
</style>
