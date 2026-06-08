import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export type CarbonContextMenuContext = {
  menuOffsetX: import("svelte/store").Writable<number>;
  currentIndex: import("svelte/store").Writable<number>;
  position: import("svelte/store").Writable<[number, number]>;
  close: () => void;
  setPopup: (popup: boolean) => void;
};

type $RestProps = SvelteHTMLElements["ul"];

type $Props = {
  /**
   * Specify an element or list of elements to trigger the context menu.
   * If no element is specified, the context menu applies to the entire window.
   * @default null
   */
  target?: null | ReadonlyArray<null | HTMLElement>;

  /**
   * Set to `true` to open the menu.
   * Either `x` and `y` must be greater than zero.
   * @default false
   */
  open?: boolean;

  /**
   * Specify the horizontal offset of the menu position.
   * @default 0
   */
  x?: number;

  /**
   * Specify the vertical offset of the menu position.
   * @default 0
   */
  y?: number;

  /**
   * Obtain a reference to the unordered list HTML element.
   * @default null
   */
  ref?: null | HTMLUListElement;

  /**
   * Accessible name for the menu.
   * Prefer setting this (or `aria-label`) when the menu is opened from the window
   * (`target` unset), where there is no visible trigger for `aria-labelledby`.
   * @default undefined
   */
  labelText?: string | undefined;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type ContextMenuProps = Omit<$RestProps, keyof $Props> & $Props;

export default class ContextMenu extends SvelteComponentTyped<
  ContextMenuProps,
  {
    click: WindowEventMap["click"];
    close: CustomEvent<null>;
    keydown: WindowEventMap["keydown"];
    open: CustomEvent<HTMLElement>;
  },
  { default: Record<string, never> }
> {}
