import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["button"];

type $Props<Icon = any> = {
  /**
   * Set to `true` to toggle the expanded state.
   * @default false
   */
  expanded?: boolean;

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
   * Obtain a reference to the HTML button element.
   * @default null
   */
  ref?: null | HTMLButtonElement;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type SideNavMenuProps<Icon = any> = Omit<
  $RestProps,
  keyof $Props<Icon>
> &
  $Props<Icon>;

export default class SideNavMenu<Icon = any> extends SvelteComponentTyped<
  SideNavMenuProps<Icon>,
  { click: WindowEventMap["click"] },
  { default: Record<string, never>; icon: Record<string, never> }
> {}
