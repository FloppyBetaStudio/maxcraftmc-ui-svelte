import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["button"];

type $Props = {
  /**
   * Specify the switch text.
   * Alternatively, use the default slot.
   * @example
   * ```svelte
   * <Switch>
   *   <span>Custom Text</span>
   * </Switch>
   * ```
   * @default "Provide text"
   */
  text?: string;

  /**
   * Set to `true` for the switch to be selected.
   * @default false
   */
  selected?: boolean;

  /**
   * Set to `true` to disable the switch
   * @default false
   */
  disabled?: boolean;

  /**
   * Set an id for the button element
   * @default `ccs-${Math.random().toString(36)}`
   */
  id?: string;

  /**
   * Obtain a reference to the button HTML element.
   * @default null
   */
  ref?: null | HTMLButtonElement;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type SwitchProps = Omit<$RestProps, keyof $Props> & $Props;

export default class Switch extends SvelteComponentTyped<
  SwitchProps,
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
