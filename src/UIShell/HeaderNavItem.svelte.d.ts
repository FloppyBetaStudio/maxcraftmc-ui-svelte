import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["a"];

type $Props = {
  /**
   * Specify the `href` attribute.
   * @default undefined
   */
  href?: string;

  /**
   * Specify the text.
   * @default undefined
   */
  text?: string;

  /**
   * Set to `true` to select the item
   * @default false
   */
  isSelected?: boolean;

  /**
   * Obtain a reference to the HTML anchor element.
   * @default null
   */
  ref?: null | HTMLAnchorElement;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type HeaderNavItemProps = Omit<$RestProps, keyof $Props> & $Props;

export default class HeaderNavItem extends SvelteComponentTyped<
  HeaderNavItemProps,
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
