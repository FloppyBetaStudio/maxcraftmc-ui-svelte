<script>
  import {
    Accordion,
    AccordionItem,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    ButtonSet,
    Checkbox,
    CheckboxGroup,
    ClickableTile,
    CodeSnippet,
    ContextMenu,
    ContextMenuDivider,
    ContextMenuGroup,
    ContextMenuOption,
    ContextMenuRadioGroup,
    ComboBox,
    ContainedList,
    ContainedListItem,
    Content,
    ContentSwitcher,
    CopyButton,
    DataTable,
    DatePicker,
    DatePickerInput,
    Dropdown,
    ExpandableTile,
    FileUploader,
    FloatingPortal,
    Grid,
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
    Heading,
    InlineLoading,
    InlineNotification,
    Link,
    Modal,
    MultiSelect,
    Loading,
    NotificationQueue,
    NumberInput,
    OrderedList,
    OverflowMenu,
    OverflowMenuItem,
    Pagination,
    PaginationNav,
    PasswordInput,
    Popover,
    Portal,
    ProgressBar,
    ProgressIndicator,
    ProgressStep,
    RadioButton,
    RadioButtonGroup,
    RadioTile,
    RangeSlider,
    Row,
    Search,
    Section,
    SessionStorage,
    SideNav,
    SideNavItems,
    SideNavLink,
    SideNavMenu,
    SideNavMenuItem,
    Select,
    SelectItem,
    SelectableTag,
    SelectableTile,
    SelectableTileGroup,
    Slider,
    SkeletonIcon,
    SkeletonPlaceholder,
    SkeletonText,
    Stack,
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
    Tag,
    TextArea,
    TextInput,
    Theme,
    Tile,
    TileGroup,
    TimePicker,
    TimePickerSelect,
    ToastNotification,
    Toggle,
    Tooltip,
    TooltipDefinition,
    TooltipIcon,
    TreeView,
    Truncate,
    UnorderedList,
  } from "../../../src/index.js";
  import "../../../css/all.css";
  import "../../../css/maxcraft.css";

  const theme = new URLSearchParams(location.search).get("theme") === "dark" ? "g100" : "white";
  const dark = theme === "g100";
  if (dark) document.documentElement.classList.add("dark");

  const items = [
    { id: "survival", text: "生存服" },
    { id: "creative", text: "创造服" },
    { id: "archive", text: "归档服", disabled: true },
  ];
  const headers = [
    { key: "server", value: "服务器" },
    { key: "status", value: "状态" },
    { key: "players", value: "玩家" },
  ];
  const rows = [
    { id: "survival", server: "Survival", status: "online", players: 42 },
    { id: "creative", server: "Creative", status: "online", players: 12 },
    { id: "event", server: "Event", status: "locked", players: 0 },
  ];
  const treeNodes = [
    {
      id: "root",
      text: "MaxCraft",
      nodes: [
        { id: "rules", text: "服务器规则" },
        { id: "systems", text: "系统", nodes: [{ id: "economy", text: "经济" }, { id: "whitelist", text: "白名单" }] },
      ],
    },
  ];

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
  let dropdownOpen = true;
  let comboOpen = true;
  let multiOpen = true;
  let overflowOpen = true;
  let contextOpen = true;
  let modalOpen = false;
  let headerPanelOpen = true;
  let search = "Steve";
  let headerSearch = "wiki";
  let selectValue = "survival";
  let files = [{ name: "server-config.yml", lastModified: 1 }];
  let selectedTags = true;
  let selectedTileValues = ["coal", "emerald"];
  let groupChoices = ["remember", "alerts"];
  let sessionValue = "gallery-session";
  let floatingAnchor;
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

  $: if (notificationQueue) {
    showQueuedNotification();
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
        active
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
      <section class="hero">
        <p class="eyebrow">MaxCraft UI</p>
        <h1>Component Gallery</h1>
        <p>Carbon-compatible Svelte components with MaxCraft visual states.</p>
        <ButtonSet>
          <Button>主操作</Button>
          <Button kind="secondary">次操作</Button>
          <Button kind="tertiary">三层操作</Button>
          <Button kind="danger">危险操作</Button>
          <Button disabled>禁用</Button>
        </ButtonSet>
      </section>

      <section class="surface" id="inputs">
        <Section level={2} tag="div">
          <Heading>Inputs</Heading>
        </Section>
        <div class="grid">
          <TextInput labelText="Minecraft ID" value="Steve" helperText="普通输入" />
          <TextInput labelText="错误状态" value="bad id" invalid invalidText="此 ID 不可用" />
          <TextInput labelText="警告状态" value="Alex" warn warnText="建议绑定 UUID" />
          <TextInput labelText="禁用状态" value="Disabled" disabled />
          <PasswordInput labelText="指令令牌" value="secret-token" />
          <PasswordInput labelText="错误令牌" value="bad-token" invalid invalidText="令牌无效" />
          <TextArea labelText="申请说明" value="希望加入服务器" />
          <TextArea labelText="错误说明" value="字数不足" invalid invalidText="请补充申请原因" />
          <Search labelText="搜索玩家" bind:value={search} />
          <Select labelText="目标服务器" bind:selected={selectValue}>
            <SelectItem value="survival" text="生存服" />
            <SelectItem value="creative" text="创造服" />
          </Select>
          <NumberInput label="席位数量" min={1} max={12} bind:value={slots} />
          <NumberInput label="税率" min={0} max={100} bind:value={taxRate} invalid invalidText="税率过高" />
          <Slider labelText="音量" min={0} max={100} bind:value={taxRate} />
          <RangeSlider
            labelText="资源区间"
            min={0}
            max={100}
            bind:value={rangeLow}
            bind:valueUpper={rangeHigh}
            minLabel="低"
            maxLabel="高"
          />
          <DatePicker datePickerType="single" value="2026-06-05">
            <DatePickerInput labelText="维护日期" placeholder="yyyy-mm-dd" />
          </DatePicker>
          <TimePicker labelText="重启时间" value="04:00">
            <TimePickerSelect>
              <SelectItem value="AM" text="AM" />
              <SelectItem value="PM" text="PM" />
            </TimePickerSelect>
          </TimePicker>
        </div>
      </section>

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
          <button class="portal-anchor" bind:this={floatingAnchor}>FloatingPortal anchor</button>
          <FloatingPortal anchor={floatingAnchor} open intrinsicWidth direction="bottom" gapBottom={8}>
            <div class="portal-surface">FloatingPortal 内容</div>
          </FloatingPortal>
          <Portal>
            <div class="portal-surface portal-fixed">Portal 内容</div>
          </Portal>
          <Popover open caret align="bottom-left" relative>
            <Button size="small">Popover trigger</Button>
            <div class="popover-body">方块风格弹出层</div>
          </Popover>
          <TooltipDefinition term="钻石色 focus">键盘焦点统一用 diamond token。</TooltipDefinition>
          <TooltipIcon tooltipText="图标 tooltip" />
          <Link href="#inputs">锚点链接</Link>
          <Truncate>这是一段会被截断的 MaxCraft UI 文本，用来覆盖 Truncate 组件。</Truncate>
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

  .hero,
  .surface {
    display: grid;
    min-width: 0;
    gap: 1rem;
  }

  .hero h1,
  .hero p,
  .surface h2,
  .surface h3,
  .surface p {
    margin: 0;
  }

  .eyebrow {
    color: var(--cds-text-02);
    font-size: 0.875rem;
    font-weight: 800;
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

  .context-target {
    position: relative;
    min-height: 13rem;
    padding: 1rem;
    border: 3px dashed var(--mc-border);
  }

  .popover-body {
    min-width: 12rem;
    padding: 1rem;
    font-weight: 800;
  }

  :global(.header-action-label) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    font-weight: 850;
  }

  :global(.tag-stack) {
    flex-wrap: wrap;
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
