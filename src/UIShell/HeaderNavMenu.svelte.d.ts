import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export type CarbonHeaderNavMenuContext = {
  selectedItems: import("svelte/store").Writable<Record<string, boolean>>;
  menuItems: import("svelte/store").Writable<ReadonlyArray<HTMLElement>>;
  updateSelectedItems: (item: { id: string; isSelected: boolean }) => void;
  registerMenuItem: (element: HTMLElement) => void;
  unregisterMenuItem: (element: HTMLElement) => void;
  closeMenu: () => Promise<void>;
};

type $RestProps = SvelteHTMLElements["a"];

type $Props = {
  /**
   * Set to `true` to toggle the expanded state.
   * @default false
   */
  expanded?: boolean;

  /**
   * Specify the `href` attribute
   * @default "/"
   */
  href?: string;

  /**
   * Specify the text.
   * @default undefined
   */
  text?: string;

  /**
   * Obtain a reference to the HTML anchor element.
   * @default null
   */
  ref?: null | HTMLAnchorElement;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type HeaderNavMenuProps = Omit<$RestProps, keyof $Props> & $Props;

export default class HeaderNavMenu extends SvelteComponentTyped<
  HeaderNavMenuProps,
  {
    blur: WindowEventMap["blur"];
    click: WindowEventMap["click"];
    focus: WindowEventMap["focus"];
    keydown: WindowEventMap["keydown"];
    keyup: WindowEventMap["keyup"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
  },
  { default: Record<string, never> }
> {}
