import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["div"];

type $Props = {
  /**
   * Set an id for the top-level element
   * @default `ccs-${Math.random().toString(36)}`
   */
  id?: string;

  /**
   * Obtain a reference to the HTML element.
   * @default null
   */
  ref?: null | HTMLDivElement;

  /**
   * Set to `true` to render the menu in a portal,
   * allowing it to escape containers with `overflow: hidden`.
   * @default false
   */
  portal?: boolean;

  /**
   * Set to `true` to open the floating portal.
   * Only used when `portal` is `true`.
   * @default false
   */
  open?: boolean;

  /**
   * Specify the anchor element to position the portal relative to.
   * Only used when `portal` is `true`.
   * @default null
   */
  anchor?: null | HTMLElement;

  /**
   * Specify the direction of the menu.
   * Only used when `portal` is `true`.
   * @default "bottom"
   */
  direction?: "bottom" | "top";

  /**
   * Class applied to a wrapper element inside the portal.
   * Only used when `portal` is `true`.
   * @default undefined
   */
  portalHostClass?: string;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type ListBoxMenuProps = Omit<$RestProps, keyof $Props> & $Props;

export default class ListBoxMenu extends SvelteComponentTyped<
  ListBoxMenuProps,
  { scroll: WindowEventMap["scroll"] },
  { default: Record<string, never> }
> {}
