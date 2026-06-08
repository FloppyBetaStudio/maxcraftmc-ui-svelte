import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["a"] & SvelteHTMLElements["p"];

type $Props = {
  /**
   * Set to `true` to click the tile.
   * @default false
   */
  clicked?: boolean;

  /**
   * Set to `true` to enable the light variant
   * @default false
   */
  light?: boolean;

  /**
   * Set to `true` to disable the tile
   * @default false
   */
  disabled?: boolean;

  /**
   * Set the `href`.
   * @default undefined
   */
  href?: string;

  /**
   * Obtain a reference to the underlying anchor HTML element.
   * @default null
   */
  ref?: undefined;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type ClickableTileProps = Omit<$RestProps, keyof $Props> & $Props;

export default class ClickableTile extends SvelteComponentTyped<
  ClickableTileProps,
  {
    blur: WindowEventMap["blur"];
    click: WindowEventMap["click"];
    focus: WindowEventMap["focus"];
    keydown: WindowEventMap["keydown"];
    keyup: WindowEventMap["keyup"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
  },
  { default: Record<string, never> }
> {}
