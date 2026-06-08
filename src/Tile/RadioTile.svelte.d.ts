import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["label"];

type $Props<Value extends string = string> = {
  /**
   * Set to `true` to check the tile.
   * @default false
   */
  checked?: boolean;

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
   * Set to `true` to mark the field as required
   * @default false
   */
  required?: boolean;

  /**
   * Specify the value of the radio input.
   * @default ""
   */
  value?: Value;

  /**
   * Specify the tabindex
   * @default "0"
   */
  tabindex?: number | string | undefined;

  /**
   * Specify the ARIA label for the radio tile checkmark icon
   * @default "Tile checkmark"
   */
  iconDescription?: string;

  /**
   * Set an id for the input element
   * @default `ccs-${Math.random().toString(36)}`
   */
  id?: string;

  /**
   * Specify a name attribute for the radio tile input.
   * @default undefined
   */
  name?: string;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type RadioTileProps<Value extends string = string> = Omit<
  $RestProps,
  keyof $Props<Value>
> &
  $Props<Value>;

export default class RadioTile<
  Value extends string = string,
> extends SvelteComponentTyped<
  RadioTileProps<Value>,
  {
    change: WindowEventMap["change"];
    click: WindowEventMap["click"];
    keydown: WindowEventMap["keydown"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
  },
  { default: Record<string, never> }
> {}
