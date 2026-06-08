import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export type CarbonBreadcrumbItemContext = Record<string, never>;

/**
 * ```svelte
 * <BreadcrumbItem let:props>
 * <a {...props} href="/">Home</a>
 * </BreadcrumbItem>
 * ```
 */
type $RestProps = SvelteHTMLElements["li"];

type $Props = {
  /**
   * Set the `href` to use an anchor link.
   * @default undefined
   */
  href?: string;

  /**
   * Set to `true` if the breadcrumb item represents the current page
   * @default false
   */
  isCurrentPage?: boolean;

  /**
   * @example
   *  ```svelte
   *  <BreadcrumbItem let:props>
   *    <a {...props} href="/">Home</a>
   *  </BreadcrumbItem>
   *  ```
   */
  children?: (
    this: void,
    ...args: [{ props?: { "aria-current"?: string; class: "bx--link" } }]
  ) => void;

  [key: `data-${string}`]: unknown;
};

export type BreadcrumbItemProps = Omit<$RestProps, keyof $Props> & $Props;

export default class BreadcrumbItem extends SvelteComponentTyped<
  BreadcrumbItemProps,
  {
    click: WindowEventMap["click"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
  },
  {
    /**
     * @example
     *  ```svelte
     *  <BreadcrumbItem let:props>
     *    <a {...props} href="/">Home</a>
     *  </BreadcrumbItem>
     *  ```
     */
    default: { props?: { "aria-current"?: string; class: "bx--link" } };
  }
> {}
