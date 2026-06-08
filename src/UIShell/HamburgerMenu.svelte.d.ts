import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["button"];

type $Props<Icon = any> = {
  /**
   * Specify the ARIA label for the button.
   * @default undefined
   */
  ariaLabel?: string;

  /**
   * Set to `true` to toggle the open state
   * @default false
   */
  isOpen?: boolean;

  /**
   * Specify the icon to render for the closed state.
   * @default Menu
   */
  iconMenu?: Icon;

  /**
   * Specify the icon to render for the opened state.
   * @default Close
   */
  iconClose?: Icon;

  /**
   * Obtain a reference to the HTML button element
   * @default null
   */
  ref?: null | HTMLButtonElement;

  [key: `data-${string}`]: unknown;
};

export type HamburgerMenuProps<Icon = any> = Omit<
  $RestProps,
  keyof $Props<Icon>
> &
  $Props<Icon>;

export default class HamburgerMenu<Icon = any> extends SvelteComponentTyped<
  HamburgerMenuProps<Icon>,
  { click: WindowEventMap["click"] },
  Record<string, never>
> {}
