import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["input"];

type $Props = {
  /**
   * Set the size of the input.
   * @default undefined
   */
  size?: "sm" | "xl";

  /**
   * Specify the input type
   * @default "text"
   */
  type?: string;

  /**
   * Specify the input placeholder text
   * @default ""
   */
  placeholder?: string;

  /**
   * Specify the Regular Expression for the input value.
   * By default, the pattern is derived from the parent
   * `DatePicker`'s `dateFormat` prop.
   * @default undefined
   */
  pattern?: string;

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
   * Specify the helper text
   * @default ""
   */
  helperText?: string;

  /**
   * Specify the ARIA label for the calendar icon
   * @default ""
   */
  iconDescription?: string;

  /**
   * Set an id for the input element
   * @default `ccs-${Math.random().toString(36)}`
   */
  id?: string;

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
   * Set a name for the input element.
   * @default undefined
   */
  name?: string;

  /**
   * Obtain a reference to the input HTML element.
   * @default null
   */
  ref?: null | HTMLInputElement;

  labelChildren?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type DatePickerInputProps = Omit<$RestProps, keyof $Props> & $Props;

export default class DatePickerInput extends SvelteComponentTyped<
  DatePickerInputProps,
  {
    blur: WindowEventMap["blur"];
    focus: WindowEventMap["focus"];
    input: WindowEventMap["input"];
    keydown: WindowEventMap["keydown"];
    keyup: WindowEventMap["keyup"];
    paste: WindowEventMap["paste"];
  },
  { labelChildren: Record<string, never> }
> {}
