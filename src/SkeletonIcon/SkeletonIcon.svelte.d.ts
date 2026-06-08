import { SvelteComponentTyped } from "svelte";
import type { SkeletonPlaceholderProps } from "../SkeletonPlaceholder/SkeletonPlaceholder.svelte";

export type SkeletonIconProps = SkeletonPlaceholderProps & {
  /**
   * Specify the icon size.
   * Carbon icons use a 16/20/24/32 scale, but any number (pixels) can be used.
   * @default 16
   */
  size?: 16 | 20 | 24 | 32 | (number & {});
};

export default class SkeletonIcon extends SvelteComponentTyped<
  SkeletonIconProps,
  {
    click: WindowEventMap["click"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
  },
  Record<string, never>
> {}
