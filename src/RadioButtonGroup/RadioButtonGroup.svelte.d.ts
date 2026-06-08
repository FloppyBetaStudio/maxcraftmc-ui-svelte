import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export type CarbonRadioButtonGroupContext<
  Value extends string | number = string | number,
> = {
  selectedValue: import("svelte/store").Writable<Value | undefined>;
  groupName: any;
  groupRequired: any;
  readonly: any;
  helperId: any;
  add: (data: { checked: boolean; value: Value }) => void;
  update: (value: Value) => void;
};

type $RestProps = SvelteHTMLElements["div"];

type $Props<Value extends string | number = string | number> = {
  /**
   * Set the selected radio button value.
   * @default undefined
   */
  selected?: Value | undefined;

  /**
   * Set to `true` to disable the radio buttons
   * @default false
   */
  disabled?: boolean;

  /**
   * Set to `true` to require the selection of a radio button.
   * @default undefined
   */
  required?: boolean;

  /**
   * Specify a name attribute for the radio button inputs.
   * @default undefined
   */
  name?: string;

  /**
   * Specify the legend text.
   * Alternatively, use the named slot "legendChildren".
   * @example
   * ```svelte
   * <RadioButtonGroup>
   *   <span slot="legendChildren">Custom Legend</span>
   *   <RadioButton labelText="Option 1" value="1" />
   *   <RadioButton labelText="Option 2" value="2" />
   *   <RadioButton labelText="Option 3" value="3" />
   * </RadioButtonGroup>
   * ```
   * @default ""
   */
  legendText?: string;

  /**
   * Set to `true` to visually hide the legend
   * @default false
   */
  hideLegend?: boolean;

  /**
   * Specify the helper text
   * @default ""
   */
  helperText?: string;

  /**
   * Set to `true` to use the read-only variant
   * @default false
   */
  readonly?: boolean;

  /**
   * Specify the label position.
   * @default "right"
   */
  labelPosition?: "right" | "left";

  /**
   * Specify the orientation of the radio buttons.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";

  /**
   * Set an id for the container div element.
   * @default undefined
   */
  id?: string;

  legendChildren?: (this: void) => void;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type RadioButtonGroupProps<
  Value extends string | number = string | number,
> = Omit<$RestProps, keyof $Props<Value>> & $Props<Value>;

export default class RadioButtonGroup<
  Value extends string | number = string | number,
> extends SvelteComponentTyped<
  RadioButtonGroupProps<Value>,
  {
    change: CustomEvent<Value>;
    click: WindowEventMap["click"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
  },
  { default: Record<string, never>; legendChildren: Record<string, never> }
> {}
