<script>
  import {
    Accordion,
    AccordionItem,
    Button,
    CodeSnippet,
    ContentSwitcher,
    CopyButton,
    FileUploader,
    FloatingPortal,
    InlineLoading,
    InlineNotification,
    Link,
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
    ToastNotification,
    TooltipDefinition,
    TooltipIcon,
    Truncate,
    UnorderedList,
  } from "../../../src/index.js";

  let files = [{ name: "server-config.yml", lastModified: 1 }];
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
    <TooltipIcon tooltipText="图标 tooltip"><span aria-hidden="true">?</span></TooltipIcon>
    <TooltipIcon tooltipText="默认 tooltip 名称" aria-label="自定义图标名称"><span aria-hidden="true">i</span></TooltipIcon>
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

  .surface h2 {
    margin: 0;
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

  @media (max-width: 48rem) {
    .surface {
      padding: 0.75rem;
    }
  }
</style>
