import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export type CarbonToolbarContext = {
  overflowVisible: import("svelte/store").Writable<boolean>;
  setOverflowVisible: (visible: boolean) => void;
  batchActionsActive: import("svelte/store").Writable<boolean>;
};

type $RestProps = SvelteHTMLElements["section"];

type $Props = {
  /**
   * Specify the toolbar size.
   * @default "default"
   */
  size?: "sm" | "default";

  /**
   * Specify the ARIA label for the toolbar.
   * @default "data table toolbar"
   */
  ariaLabel?: string;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type ToolbarProps = Omit<$RestProps, keyof $Props> & $Props;

export default class Toolbar extends SvelteComponentTyped<
  ToolbarProps,
  Record<string, any>,
  { default: Record<string, never> }
> {}
