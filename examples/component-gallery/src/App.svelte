<script>
  import {
    Content,
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
    Modal,
    TextArea,
    TextInput,
    Theme,
  } from "../../../src/index.js";
  import ChoicesAndMenusSection from "./ChoicesAndMenusSection.svelte";
  import DataSection from "./DataSection.svelte";
  import FeedbackSection from "./FeedbackSection.svelte";
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
  let selectedTags = true;
  let selectedTileValues = ["coal", "emerald"];
  let groupChoices = ["remember", "alerts"];

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

      <FeedbackSection />

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

  :global(.header-action-label) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    font-weight: 850;
  }

  :global(.bx--modal .bx--form-item + .bx--form-item) {
    margin-top: 1rem;
  }
</style>
