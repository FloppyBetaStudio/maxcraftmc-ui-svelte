import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["li"];

type $Props<Icon = any> = {
  /**
   * Specify the tab label.
   * Alternatively, use the default slot.
   * @example
   * ```svelte
   * <Tab>
   *   <span>Label</span>
   * </Tab>
   * ```
   * @default ""
   */
  label?: string;

  /**
   * Specify the href attribute
   * @default "#"
   */
  href?: string;

  /**
   * Set to `true` to disable the tab
   * @default false
   */
  disabled?: boolean;

  /**
   * Specify the tabindex
   * @default "0"
   */
  tabindex?: number | string | undefined;

  /**
   * Set an id for the top-level element
   * @default `ccs-${Math.random().toString(36)}`
   */
  id?: string;

  /**
   * Specify an optional secondary label.
   * Only rendered for container type tabs.
   * Alternatively, use the "secondaryChildren" slot.
   * @default ""
   */
  secondaryLabel?: string;

  /**
   * Specify the icon to render.
   * Icon is rendered to the right of the label.
   * @default undefined
   */
  icon?: Icon;

  /**
   * Obtain a reference to the anchor HTML element.
   * @default null
   */
  ref?: null | HTMLAnchorElement;

  secondaryChildren?: (this: void) => void;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type TabProps<Icon = any> = Omit<$RestProps, keyof $Props<Icon>> &
  $Props<Icon>;

export default class Tab<Icon = any> extends SvelteComponentTyped<
  TabProps<Icon>,
  {
    click: WindowEventMap["click"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
  },
  { default: Record<string, never>; secondaryChildren: Record<string, never> }
> {}
