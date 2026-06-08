import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["input"];

type $Props<Value extends string = string> = {
  /**
   * Set to `true` to check the input.
   * @default false
   */
  checked?: boolean;

  /**
   * Specify the title of the input
   * @default "title"
   */
  title?: string;

  /**
   * Specify the value of the input.
   * @default "value"
   */
  value?: Value;

  /**
   * Set an id for the input element
   * @default `ccs-${Math.random().toString(36)}`
   */
  id?: string;

  /**
   * Specify a name attribute for the input
   * @default ""
   */
  name?: string;

  /**
   * Obtain a reference to the input HTML element.
   * @default null
   */
  ref?: null | HTMLInputElement;

  [key: `data-${string}`]: unknown;
};

export type StructuredListInputProps<Value extends string = string> = Omit<
  $RestProps,
  keyof $Props<Value>
> &
  $Props<Value>;

export default class StructuredListInput<
  Value extends string = string,
> extends SvelteComponentTyped<
  StructuredListInputProps<Value>,
  Record<string, any>,
  Record<string, never>
> {}
