<script>
  import {
    Accordion,
    AccordionItem,
    Button,
    CodeSnippet,
    Content,
    ContentSwitcher,
    CopyButton,
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
    Popover,
    Portal,
    ProgressBar,
    ProgressIndicator,
    ProgressStep,
    SessionStorage,
    SkeletonIcon,
    SkeletonPlaceholder,
    SkeletonText,
    Switch,
    TextArea,
    TextInput,
    Theme,
    ToastNotification,
    Tooltip,
    TooltipDefinition,
    TooltipIcon,
    Truncate,
    UnorderedList,
  } from "../../../src/index.js";
  import ChoicesAndMenusSection from "./ChoicesAndMenusSection.svelte";
  import DataSection from "./DataSection.svelte";
  import GalleryHero from "./GalleryHero.svelte";
  import InputsSection from "./InputsSection.svelte";
  import TilesAndNavigationSection from "./TilesAndNavigationSection.svelte";
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

      <TilesAndNavigationSection bind:tile bind:selectedTileValues bind:tab bind:pageNav />

      <DataSection {headers} {rows} {treeNodes} bind:page />

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

  .surface h2 {
    margin: 0;
  }

  .surface {
    padding: 1rem;
    border: 4px solid var(--mc-border);
    background: var(--cds-layer);
    box-shadow: var(--mc-shadow-block);
  }

  .grid {
    display: grid;
    min-width: 0;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr));
    align-items: start;
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

  :global(.bx--modal .bx--form-item + .bx--form-item) {
    margin-top: 1rem;
  }

  @media (max-width: 48rem) {
    .surface {
      padding: 0.75rem;
    }
  }
</style>
