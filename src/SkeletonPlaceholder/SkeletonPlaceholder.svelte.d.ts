import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["div"];

type $Props = {
  /**
   * Shorthand size that sets both width and height.
   * Accepts a number (px) or string (e.g., "12rem").
   * @default undefined
   */
  size?: number | string;

  /**
   * Width of the placeholder.
   * Accepts a number (px) or string (e.g., "12rem").
   * @default undefined
   */
  width?: number | string;

  /**
   * Height of the placeholder.
   * Accepts a number (px) or string (e.g., "12rem").
   * @default undefined
   */
  height?: number | string;

  [key: `data-${string}`]: unknown;
};

export type SkeletonPlaceholderProps = Omit<$RestProps, keyof $Props> & $Props;

export default class SkeletonPlaceholder extends SvelteComponentTyped<
  SkeletonPlaceholderProps,
  {
    click: WindowEventMap["click"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
  },
  Record<string, never>
> {}
