import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["div"];

type $Props = {
  /**
   * Set to `true` to use the range variant
   * @default false
   */
  range?: boolean;

  /**
   * Set to `true` to use the short variant
   * @default false
   */
  short?: boolean;

  [key: `data-${string}`]: unknown;
};

export type DatePickerSkeletonProps = Omit<$RestProps, keyof $Props> & $Props;

export default class DatePickerSkeleton extends SvelteComponentTyped<
  DatePickerSkeletonProps,
  {
    click: WindowEventMap["click"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
  },
  Record<string, never>
> {}
