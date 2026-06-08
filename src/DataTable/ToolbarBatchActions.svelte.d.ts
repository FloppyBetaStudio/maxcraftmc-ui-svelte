import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["div"];

type $Props<Id = any> = {
  /**
   * Override the total items selected text.
   */
  formatTotalSelected?: (totalSelected: number) => string;

  /**
   * Use a boolean to show or hide the toolbar.
   * @default undefined
   */
  active?: undefined | boolean;

  /**
   * Specify the selected IDs for standalone usage.
   * This is unnecessary if using this component with `DataTable`.
   * @default []
   */
  selectedIds?: ReadonlyArray<Id>;

  cancel?: (this: void) => void;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type ToolbarBatchActionsProps<Id = any> = Omit<
  $RestProps,
  keyof $Props<Id>
> &
  $Props<Id>;

export default class ToolbarBatchActions<Id = any> extends SvelteComponentTyped<
  ToolbarBatchActionsProps<Id>,
  { cancel: CustomEvent<null> },
  { default: Record<string, never>; cancel: Record<string, never> }
> {}
