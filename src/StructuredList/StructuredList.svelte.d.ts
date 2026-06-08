import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export type CarbonStructuredListWrapperContext<Value extends string = string> =
  {
    selectedValue: import("svelte/store").Writable<Value | undefined>;
    update: (value: Value) => void;
  };

type $RestProps = SvelteHTMLElements["div"];

type $Props<Value extends string = string> = {
  /**
   * Specify the selected structured list row value.
   * @default undefined
   */
  selected?: Value | undefined;

  /**
   * Set to `true` to use the condensed variant
   * @default false
   */
  condensed?: boolean;

  /**
   * Set to `true` to flush the list
   * @default false
   */
  flush?: boolean;

  /**
   * Set to `true` to use the selection variant
   * @default false
   */
  selection?: boolean;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type StructuredListProps<Value extends string = string> = Omit<
  $RestProps,
  keyof $Props<Value>
> &
  $Props<Value>;

export default class StructuredList<
  Value extends string = string,
> extends SvelteComponentTyped<
  StructuredListProps<Value>,
  {
    change: CustomEvent<Value>;
    click: WindowEventMap["click"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
  },
  { default: Record<string, never> }
> {}
