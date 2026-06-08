import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["input"];

type $Props = {
  /**
   * Specify the size of the input.
   * @default undefined
   */
  size?: "sm" | "xl";

  /**
   * Specify the input value.
   * @default ""
   */
  value?: string;

  /**
   * Specify the input placeholder text
   * @default "hh:mm"
   */
  placeholder?: string;

  /**
   * Specify the `pattern` attribute for the input element
   * @default "(1[012]|[1-9]):[0-5][0-9](\\s)?"
   */
  pattern?: string;

  /**
   * Specify the `maxlength` input attribute
   * @default 5
   */
  maxlength?: number;

  /**
   * Set to `true` to enable the light variant
   * @default false
   */
  light?: boolean;

  /**
   * Set to `true` to disable the input
   * @default false
   */
  disabled?: boolean;

  /**
   * Set to `true` to mark the input as read-only
   * @default false
   */
  readonly?: boolean;

  /**
   * Specify the label text
   * @default ""
   */
  labelText?: string;

  /**
   * Set to `true` to visually hide the label text
   * @default false
   */
  hideLabel?: boolean;

  /**
   * Set to `true` to indicate an invalid state
   * @default false
   */
  invalid?: boolean;

  /**
   * Specify the invalid state text
   * @default ""
   */
  invalidText?: string;

  /**
   * Set to `true` to indicate a warning state
   * @default false
   */
  warn?: boolean;

  /**
   * Specify the warning state text
   * @default ""
   */
  warnText?: string;

  /**
   * Specify the helper text
   * @default ""
   */
  helperText?: string;

  /**
   * Set an id for the input element
   * @default `ccs-${Math.random().toString(36)}`
   */
  id?: string;

  /**
   * Specify a name attribute for the input.
   * @default undefined
   */
  name?: string;

  /**
   * Obtain a reference to the input HTML element.
   * @default null
   */
  ref?: null | HTMLInputElement;

  labelChildren?: (this: void) => void;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type TimePickerProps = Omit<$RestProps, keyof $Props> & $Props;

export default class TimePicker extends SvelteComponentTyped<
  TimePickerProps,
  {
    blur: WindowEventMap["blur"];
    change: WindowEventMap["change"];
    click: WindowEventMap["click"];
    focus: WindowEventMap["focus"];
    input: WindowEventMap["input"];
    keydown: WindowEventMap["keydown"];
    keyup: WindowEventMap["keyup"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
    paste: WindowEventMap["paste"];
  },
  { default: Record<string, never>; labelChildren: Record<string, never> }
> {}
