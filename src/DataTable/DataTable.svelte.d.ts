import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export type DataTableValue = any;

export interface DataTableRow<Id = any> {
  id: Id;
  [key: string]: DataTableValue;
}

export type DataTableKey<Row = DataTableRow> = [
  keyof import("./data-table-utils.d.ts").KeysWithoutIndexSignature<Row>,
] extends [never]
  ? import("./data-table-utils.d.ts").PropertyPath<Row>
  : keyof import("./data-table-utils.d.ts").KeysWithoutIndexSignature<Row> extends "id"
    ? import("./data-table-utils.d.ts").PropertyPath<Row>
    : Row extends DataTableRow
      ? import("./data-table-utils.d.ts").PropertyPathIgnoringIndexSignatures<Row>
      : import("./data-table-utils.d.ts").PropertyPath<Row>;

/**
 * Path keys for sort, headers, and cells; mirrors PropertyPath / PropertyPathIgnoringIndexSignatures in ./data-table-utils.d.ts.
 */
export type DataTableSortValue<Row = DataTableRow> =
  import("./data-table-utils.d.ts").DataTableSortValue<Row>;

export type DataTableEmptyHeader<Row = DataTableRow> = {
  key: DataTableKey<Row> | (string & {});
  /** Whether the header is empty */
  empty: true;
  display?: (item: DataTableValue, row: Row) => DataTableValue;
  sort?:
    | false
    | ((a: DataTableSortValue<Row>, b: DataTableSortValue<Row>) => number);
  /** Override table-level sortAlways for this column */
  sortAlways?: boolean;
  /** Whether the column menu is enabled */
  columnMenu?: boolean;
  width?: string;
  minWidth?: string;
};

export type DataTableNonEmptyHeader<Row = DataTableRow> = {
  key: DataTableKey<Row>;
  empty?: false;
  value: DataTableValue;
  display?: (item: DataTableValue, row: Row) => DataTableValue;
  sort?:
    | false
    | ((a: DataTableSortValue<Row>, b: DataTableSortValue<Row>) => number);
  /** Override table-level sortAlways for this column */
  sortAlways?: boolean;
  /** Whether the column menu is enabled */
  columnMenu?: boolean;
  width?: string;
  minWidth?: string;
};

export type DataTableHeader<Row = DataTableRow> =
  | DataTableNonEmptyHeader<Row>
  | DataTableEmptyHeader<Row>;

export type DataTableCell<Row = DataTableRow> = {
  key: DataTableKey<Row> | (string & {});
  value: DataTableValue;
  display?: (item: DataTableValue, row: DataTableRow) => DataTableValue;
};

export interface DataTableRowClassArgs<Row = DataTableRow> {
  row: Row;
  rowIndex: number;
  selected: boolean;
  expanded: boolean;
}

export type DataTableRowClass<Row = DataTableRow> =
  | string
  | ((row: DataTableRowClassArgs<Row>) => string | undefined);

export type CarbonDataTableContext<Row extends DataTableRow = DataTableRow> = {
  batchSelectedIds: import("svelte/store").Writable<ReadonlyArray<Row["id"]>>;
  tableRows: import("svelte/store").Writable<ReadonlyArray<Row>>;
  resetSelectedRowIds: () => void;
  filterRows: (
    searchValue: string,
    customFilter?: (row: Row, value: string) => boolean,
  ) => ReadonlyArray<Row["id"]>;
};

type $RestProps = SvelteHTMLElements["div"];

type $Props<Row extends DataTableRow = DataTableRow> = {
  /**
   * Specify the data table headers.
   * @default []
   */
  headers?: ReadonlyArray<DataTableHeader<Row>>;

  /**
   * Specify the rows the data table should render.
   * Keys defined in `headers` are used for the row ids.
   * @default []
   */
  rows?: ReadonlyArray<Row>;

  /**
   * Set the size of the data table.
   * @default undefined
   */
  size?: "compact" | "short" | "medium" | "tall";

  /**
   * Specify the title of the data table
   * @default ""
   */
  title?: string;

  /**
   * Specify the description of the data table
   * @default ""
   */
  description?: string;

  /**
   * Specify a custom class name for each row.
   * Provide a function to return a class name based
   * on row properties, allowing conditional classes
   * based on selected/expanded state.
   * @example
   * ```svelte
   * <DataTable rowClass={({ row, rowIndex, selected, expanded }) => {
   *   return `row-${rowIndex} ${selected ? 'selected' : ''} ${expanded ? 'expanded' : ''}`;
   * }} />
   * ```
   * @default undefined
   */
  rowClass?: DataTableRowClass<Row>;

  /**
   * Specify a name attribute for the input elements
   * in a selectable data table (radio or checkbox).
   * When the table is inside a form, this name will
   * be included in the form data on submit.
   * @default `ccs-${Math.random().toString(36)}`
   */
  inputName?: string;

  /**
   * Set to `true` to use zebra styles
   * @default false
   */
  zebra?: boolean;

  /**
   * Set to `true` for the sortable variant
   * @default false
   */
  sortable?: boolean;

  /**
   * Specify the header key to sort by.
   * @default null
   */
  sortKey?: DataTableKey<Row>;

  /**
   * Specify the sort direction.
   * @default "none"
   */
  sortDirection?: "none" | "ascending" | "descending";

  /**
   * Set to `true` to only toggle between "ascending" and
   * "descending" sort directions, skipping "none".
   * @default false
   */
  sortAlways?: boolean;

  /**
   * Specify a default sort comparator for all sortable columns.
   * Per-header `sort` functions take precedence over this prop.
   *
   * With a typed row generic, `a` and `b` are {@link DataTableSortValue} (the union of cell value types over every {@link DataTableKey} on `Row`). Narrow using `context.key` (typed as {@link DataTableKey}) or runtime checks.
   * @example
   * ```svelte
   * <DataTable
   *   sort={(a, b, { key }) => {
   *     switch (key) {
   *       case "expireDate":
   *         return new Date(a) - new Date(b);
   *       case "port":
   *         return a - b;
   *       default:
   *         return String(a).localeCompare(String(b));
   *     }
   *   }}
   * />
   * ```
   * @default undefined
   */
  sort?: (
    a: DataTableSortValue<Row>,
    b: DataTableSortValue<Row>,
    context: {
      key: DataTableKey<Row>;
      ascending: boolean;
      row_a: Row;
      row_b: Row;
    },
  ) => number;

  /**
   * Set to `true` for the expandable variant.
   * Automatically set to `true` if `batchExpansion` is `true`.
   * @default false
   */
  expandable?: boolean;

  /**
   * Set to `true` to enable batch expansion.
   * @default false
   */
  batchExpansion?: boolean;

  /**
   * Specify the row ids to be expanded.
   * @default []
   */
  expandedRowIds?: ReadonlyArray<Row["id"]>;

  /**
   * Specify the ids for rows that should not be expandable.
   * @default []
   */
  nonExpandableRowIds?: ReadonlyArray<Row["id"]>;

  /**
   * Set to `true` for the radio selection variant
   * @default false
   */
  radio?: boolean;

  /**
   * Set to `true` for the selectable variant.
   * Automatically set to `true` if `radio` or `batchSelection` are `true`.
   * @default false
   */
  selectable?: boolean;

  /**
   * Set to `true` to enable batch selection
   * @default false
   */
  batchSelection?: boolean;

  /**
   * Specify the row ids to be selected.
   * @default []
   */
  selectedRowIds?: ReadonlyArray<Row["id"]>;

  /**
   * Specify the ids of rows that should not be selectable.
   * @default []
   */
  nonSelectableRowIds?: ReadonlyArray<Row["id"]>;

  /**
   * Set to `true` to enable a sticky header
   * @default false
   */
  stickyHeader?: boolean;

  /**
   * Set to `true` to use static width
   * @default false
   */
  useStaticWidth?: boolean;

  /**
   * Specify the number of items to display in a page
   * @default 0
   */
  pageSize?: number;

  /**
   * Set to `number` to set current page
   * @default 0
   */
  page?: number;

  /**
   * Enable virtualization for large row lists. Virtualization renders only the rows currently visible in the viewport, improving performance for large datasets.
   *
   * Virtualization is opt-in. Set `virtualize={true}` to enable with default settings, or pass a configuration object to customize.
   * Virtualized tables are intended for use with `stickyHeader={true}` so the header stays visible while scrolling. Pagination is ignored when virtualization is enabled.
   * Virtualization assumes a uniform row height; combining it with `expandable` rows is not supported and may cause incorrect scroll-spacer sizing when rows are expanded mid-list.
   *
   * Provide an object to customize virtualization behavior:
   * - `itemHeight` (default: 48 for medium size, adjusted for size variant): The height in pixels of each row. Specify a custom value when using custom slots with multi-line content or different heights.
   * - `maxVisibleRows` (default: 10): The maximum number of rows to display in the viewport. The container height will be calculated as `itemHeight * maxVisibleRows`. Overridden by `containerHeight` if explicitly provided.
   * - `containerHeight` (default: calculated from maxVisibleRows): The maximum height in pixels of the table body container. If not provided, calculated from `itemHeight * maxVisibleRows`.
   * - `overscan` (default: 3): The number of extra rows to render above and below the viewport for smoother scrolling. Higher values may cause more flickering during very fast scrolling.
   * - `threshold` (default: 100): The minimum number of rows required before virtualization activates. Tables with fewer rows will render all rows normally without virtualization.
   * - `maxItems` (default: undefined): The maximum number of rows to render. When undefined, all visible rows are rendered.
   * @default undefined
   */
  virtualize?:
    | undefined
    | boolean
    | {
        itemHeight?: number;
        maxVisibleRows?: number;
        containerHeight?: number;
        overscan?: number;
        threshold?: number;
        maxItems?: number;
      };

  /**
   * Obtain a reference to the table wrapper element. When virtualization is enabled and `stickyHeader` is false, this element is the scroll container—use `bind:scrollContainerRef` to programmatically control scroll position (e.g. `scrollContainerRef.scrollTop = 0`).
   * @default null
   */
  scrollContainerRef?: null | HTMLDivElement;

  /**
   * Override the default table header translation ids.
   * @default undefined
   */
  tableHeaderTranslateWithId?: (
    id: import("./TableHeader.svelte").TableHeaderTranslationId,
  ) => string;

  cell?: (
    this: void,
    ...args: [
      {
        row: Row;
        cell: DataTableCell<Row>;
        rowIndex: number;
        cellIndex: number;
        rowSelected: boolean;
        rowExpanded: boolean;
      },
    ]
  ) => void;

  cellHeader?: (
    this: void,
    ...args: [{ header: DataTableNonEmptyHeader }]
  ) => void;

  descriptionChildren?: (
    this: void,
    ...args: [{ props: { class: "bx--data-table-header__description" } }]
  ) => void;

  expandIcon?: (
    this: void,
    ...args: [
      {
        expanded: boolean;
        row: Row | undefined;
        props: { "aria-hidden": "true" | "false"; class: string };
      },
    ]
  ) => void;

  expandedRow?: (
    this: void,
    ...args: [{ row: Row; rowSelected: boolean }]
  ) => void;

  titleChildren?: (
    this: void,
    ...args: [{ props: { class: "bx--data-table-header__title" } }]
  ) => void;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type DataTableProps<Row extends DataTableRow = DataTableRow> = Omit<
  $RestProps,
  keyof $Props<Row>
> &
  $Props<Row>;

export default class DataTable<
  Row extends DataTableRow = DataTableRow,
> extends SvelteComponentTyped<
  DataTableProps<Row>,
  {
    click: CustomEvent<{
      header?: DataTableHeader<Row>;
      row?: Row;
      cell?: DataTableCell<Row>;
    }>;
    "click:cell": CustomEvent<{
      cell: DataTableCell<Row>;
      target: EventTarget;
      currentTarget: EventTarget;
      rowClass?: DataTableRowClass<Row>;
    }>;
    "click:header": CustomEvent<{
      header: DataTableHeader<Row>;
      /** The intended next sort direction for this click, reported regardless of whether the `sort` event was cancelled. */
      sortDirection?: "ascending" | "descending" | "none";
      target: EventTarget;
      currentTarget: EventTarget;
    }>;
    "click:header--expand": CustomEvent<{
      expanded: boolean;
    }>;
    "click:header--select": CustomEvent<{
      indeterminate: boolean;
      selected: boolean;
    }>;
    "click:row": CustomEvent<{
      row: Row;
      target: EventTarget;
      currentTarget: EventTarget;
    }>;
    "click:row--expand": CustomEvent<{
      expanded: boolean;
      row: Row;
    }>;
    "click:row--select": CustomEvent<{
      selected: boolean;
      row: Row;
    }>;
    "mouseenter:row": CustomEvent<Row>;
    "mouseleave:row": CustomEvent<Row>;
    /** Dispatched when a sortable column header would change the active sort. The event is cancelable: call `preventDefault()` to skip updating `sortKey` / `sortDirection` and skip client side sorting for that click (for example full server side sorting while still reading `detail.key` / `detail.direction` for your API). If not cancelled, the table applies the new sort and sorts the current `rows` client side. Typical uses: server side sorting, URL or query string sync, analytics, and persisting sort preferences. */
    sort: CustomEvent<
      | { key: null; direction: "none" }
      | { key: DataTableKey<Row>; direction: "ascending" | "descending" }
    >;
  },
  {
    default: Record<string, never>;
    cell: {
      row: Row;
      cell: DataTableCell<Row>;
      rowIndex: number;
      cellIndex: number;
      rowSelected: boolean;
      rowExpanded: boolean;
    };
    cellHeader: { header: DataTableNonEmptyHeader };
    descriptionChildren: {
      props: { class: "bx--data-table-header__description" };
    };
    expandIcon: {
      expanded: boolean;
      row: Row | undefined;
      props: { "aria-hidden": "true" | "false"; class: string };
    };
    expandedRow: { row: Row; rowSelected: boolean };
    titleChildren: { props: { class: "bx--data-table-header__title" } };
  }
> {}
