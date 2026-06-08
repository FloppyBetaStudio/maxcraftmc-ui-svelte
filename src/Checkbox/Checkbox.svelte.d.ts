import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["div"];

type $Props<T = any> = {
  /**
   * Specify the value of the checkbox.
   * @default ""
   */
  value?: T;

  /**
   * Specify whether the checkbox is checked.
   * @default false
   */
  checked?: boolean;

  /**
   * Specify the bound group.
   * @default undefined
   */
  group?: ReadonlyArray<T> | undefined;

  /**
   * Specify whether the checkbox is indeterminate.
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Set to `true` to display the skeleton state
   * @default false
   */
  skeleton?: boolean;

  /**
   * Set to `true` to mark the field as required
   * @default false
   */
  required?: boolean;

  /**
   * Set to `true` for the checkbox to be read-only
   * @default false
   */
  readonly?: boolean;

  /**
   * Set to `true` to disable the checkbox
   * @default false
   */
  disabled?: boolean;

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
   * Specify the helper text
   * @default ""
   */
  helperText?: string;

  /**
   * Set a name for the input element
   * @default ""
   */
  name?: string;

  /**
   * Specify the title attribute for the label element.
   * @default undefined
   */
  title?: string;

  /**
   * Set an id for the input label
   * @default `ccs-${Math.random().toString(36)}`
   */
  id?: string;

  /**
   * Obtain a reference to the input HTML element.
   * @default null
   */
  ref?: null | HTMLInputElement;

  labelChildren?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type CheckboxProps<T = any> = Omit<$RestProps, keyof $Props<T>> &
  $Props<T>;

export default class Checkbox<T = any> extends SvelteComponentTyped<
  CheckboxProps<T>,
  {
    blur: WindowEventMap["blur"];
    change: WindowEventMap["change"];
    check: CustomEvent<boolean>;
    click: WindowEventMap["click"];
    focus: WindowEventMap["focus"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
  },
  { labelChildren: Record<string, never> }
> {}
