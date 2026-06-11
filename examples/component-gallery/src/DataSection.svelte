<script>
  import {
    ContainedList,
    ContainedListItem,
    DataTable,
    Pagination,
    StructuredList,
    StructuredListBody,
    StructuredListCell,
    StructuredListHead,
    StructuredListInput,
    StructuredListRow,
    TreeView,
  } from "../../../src/index.js";

  export let headers = [];
  export let rows = [];
  export let treeNodes = [];
  export let page = 2;
</script>

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

  @media (max-width: 48rem) {
    .surface {
      padding: 0.75rem;
    }
  }
</style>
