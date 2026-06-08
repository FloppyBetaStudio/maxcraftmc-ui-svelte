import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["div"];

type $Props = {
  /**
   * Specify the number of rows
   * @default 5
   */
  rows?: number;

  /**
   * Specify the number of columns
   * @default 3
   */
  columns?: number;

  [key: `data-${string}`]: unknown;
};

export type StructuredListSkeletonProps = Omit<$RestProps, keyof $Props> &
  $Props;

export default class StructuredListSkeleton extends SvelteComponentTyped<
  StructuredListSkeletonProps,
  {
    click: WindowEventMap["click"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
  },
  Record<string, never>
> {}
