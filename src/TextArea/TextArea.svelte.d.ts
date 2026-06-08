import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["textarea"];

type $Props = {
  /**
   * Specify the textarea value.
   * @default ""
   */
  value?: null | string;

  /**
   * Specify the placeholder text
   * @default ""
   */
  placeholder?: string;

  /**
   * Specify the number of cols.
   * If specified, the textarea will not be resizable.
   * Override this using the `resize` style attribute.
   * @default undefined
   */
  cols?: number;

  /**
   * Specify the number of rows
   * @default 4
   */
  rows?: number;

  /**
   * Specify the max character count.
   * @default undefined
   */
  maxCount?: number;

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
   * Set to `true` to use the read-only variant
   * @default false
   */
  readonly?: boolean;

  /**
   * Specify the helper text
   * @default ""
   */
  helperText?: string;

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
   * Specify the text for the invalid state
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
   * Set an id for the textarea element
   * @default `ccs-${Math.random().toString(36)}`
   */
  id?: string;

  /**
   * Specify a name attribute for the input.
   * @default undefined
   */
  name?: string;

  /**
   * Obtain a reference to the textarea HTML element.
   * @default null
   */
  ref?: null | HTMLTextAreaElement;

  labelChildren?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type TextAreaProps = Omit<$RestProps, keyof $Props> & $Props;

export default class TextArea extends SvelteComponentTyped<
  TextAreaProps,
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
  { labelChildren: Record<string, never> }
> {}
