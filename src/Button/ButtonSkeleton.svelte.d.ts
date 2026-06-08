import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["a"];

type $Props = {
  /**
   * Set the `href` to use an anchor link.
   * @default undefined
   */
  href?: string;

  /**
   * Specify the size of button skeleton.
   * @default "default"
   */
  size?: "default" | "field" | "small" | "lg" | "xl";

  [key: `data-${string}`]: unknown;
};

export type ButtonSkeletonProps = Omit<$RestProps, keyof $Props> & $Props;

export default class ButtonSkeleton extends SvelteComponentTyped<
  ButtonSkeletonProps,
  {
    blur: WindowEventMap["blur"];
    click: WindowEventMap["click"];
    focus: WindowEventMap["focus"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
  },
  Record<string, never>
> {}
