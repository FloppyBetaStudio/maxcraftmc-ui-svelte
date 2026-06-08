import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export type NumberInputTranslationId = "increment" | "decrement";

type $RestProps = SvelteHTMLElements["input"];

type $Props = {
  /**
   * Set the size of the input.
   * @default undefined
   */
  size?: "sm" | "xl";

  /**
   * Specify the input value.
   * Use `null` to denote "no value".
   * @default null
   */
  value?: null | number;

  /**
   * Specify the step increment
   * @default 1
   */
  step?: number;

  /**
   * Specify the maximum value.
   * @default undefined
   */
  max?: number;

  /**
   * Specify the minimum value.
   * @default undefined
   */
  min?: number;

  /**
   * Provide the value stepping should begin at when the input is empty.
   * @default undefined
   */
  stepStartValue?: number;

  /**
   * Set to `true` to enable the light variant
   * @default false
   */
  light?: boolean;

  /**
   * Set to `true` for the input to be read-only
   * @default false
   */
  readonly?: boolean;

  /**
   * Set to `true` to allow for an empty value
   * @default false
   */
  allowEmpty?: boolean;

  /**
   * Set to `true` to preserve decimal input formatting.
   * When enabled, uses type="text" with inputmode="decimal" instead of type="number".
   * @example
   * ```svelte
   * <NumberInput allowDecimal={true} value="1.0" />
   * <NumberInput allowDecimal={true} value="2.00" />
   * ```
   * @default false
   */
  allowDecimal?: boolean;

  /**
   * Specify a BCP 47 locale for number formatting.
   * When set, forces type="text" with inputmode="decimal"
   * and formats the display value using Intl.NumberFormat.
   * @example
   * ```svelte
   * <NumberInput locale="de-DE" value={1234.5} />
   * <NumberInput locale="en-US" value={1234.5} />
   * ```
   * @default undefined
   */
  locale?: string;

  /**
   * Specify Intl.NumberFormat options when `locale` is set.
   * @example
   * ```svelte
   * <NumberInput locale="en-US" formatOptions={{ minimumFractionDigits: 2 }} value={1234.5} />
   * ```
   * @default undefined
   */
  formatOptions?: Intl.NumberFormatOptions;

  /**
   * Set to `true` to disable the input
   * @default false
   */
  disabled?: boolean;

  /**
   * Set to `true` to hide the input stepper buttons
   * @default false
   */
  hideSteppers?: boolean;

  /**
   * Set to `true` to prevent the scroll wheel from changing the input value
   * @default false
   */
  disableWheel?: boolean;

  /**
   * Custom validation function.
   * Receives the current raw input string and locale.
   * Return `true` to force valid, `false` to force invalid,
   * or `undefined` to defer to built-in validation.
   * @example
   * ```svelte
   * <NumberInput validate={(raw) => Number(raw) % 2 === 0} invalidText="Must be even" />
   * ```
   * @default undefined
   */
  validate?: (value: string, locale: string | undefined) => boolean | undefined;

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
   * Override the default translation ids.
   */
  translateWithId?: (id: NumberInputTranslationId) => string;

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

  [key: `data-${string}`]: unknown;
};

export type NumberInputProps = Omit<$RestProps, keyof $Props> & $Props;

export default class NumberInput extends SvelteComponentTyped<
  NumberInputProps,
  {
    blur: CustomEvent<{ event: FocusEvent; value: null | number }>;
    "blur:stepper": CustomEvent<{
      event: FocusEvent;
      value: null | number;
      direction: "up" | "down";
    }>;
    change: CustomEvent<null | number>;
    click: WindowEventMap["click"];
    "click:stepper": CustomEvent<{
      value: null | number;
      direction: "up" | "down";
    }>;
    focus: WindowEventMap["focus"];
    input: CustomEvent<null | number>;
    keydown: WindowEventMap["keydown"];
    keyup: WindowEventMap["keyup"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
    paste: WindowEventMap["paste"];
  },
  { labelChildren: Record<string, never> }
> {
  /**
   * Default translation ids.
   */
  translationIds: { increment: "increment"; decrement: "decrement" };
}
