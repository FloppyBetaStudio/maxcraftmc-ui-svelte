import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["a"];

type $Props<Icon = any> = {
  /**
   * Set to `true` to use the active state
   * @default false
   */
  linkIsActive?: boolean;

  /**
   * Specify the `href` attribute.
   * @default undefined
   */
  href?: string;

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

  [key: `data-${string}`]: unknown;
};

export type HeaderActionLinkProps<Icon = any> = Omit<
  $RestProps,
  keyof $Props<Icon>
> &
  $Props<Icon>;

export default class HeaderActionLink<Icon = any> extends SvelteComponentTyped<
  HeaderActionLinkProps<Icon>,
  { click: WindowEventMap["click"] },
  { icon: Record<string, never> }
> {}
