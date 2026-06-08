import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["a"];

type $Props<Icon = any> = {
  /**
   * Set to `true` to select the current link
   * @default false
   */
  isSelected?: boolean;

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
   * Specify the icon to render.
   * @default undefined
   */
  icon?: Icon;

  /**
   * Obtain a reference to the HTML anchor element.
   * @default null
   */
  ref?: null | HTMLAnchorElement;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type SideNavLinkProps<Icon = any> = Omit<
  $RestProps,
  keyof $Props<Icon>
> &
  $Props<Icon>;

export default class SideNavLink<Icon = any> extends SvelteComponentTyped<
  SideNavLinkProps<Icon>,
  { click: WindowEventMap["click"] },
  { default: Record<string, never>; icon: Record<string, never> }
> {}
