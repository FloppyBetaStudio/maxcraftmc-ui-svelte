import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export type CarbonCheckboxGroupContext = {
  selectedValues: import("svelte/store").Writable<
    ReadonlyArray<string | number>
  >;
  groupName: any;
  groupRequired: any;
  readonly: any;
  update: (value: string | number, checked: boolean) => void;
};

type $RestProps = SvelteHTMLElements["div"];

type $Props = {
  /**
   * Set the selected checkbox values.
   * @default []
   */
  selected?: ReadonlyArray<string | number>;

  /**
   * Set to `true` to disable all checkboxes
   * @default false
   */
  disabled?: boolean;

  /**
   * Set to `true` to require at least one selection.
   * @default undefined
   */
  required?: boolean;

  /**
   * Specify a name attribute for the checkbox inputs.
   * @default undefined
   */
  name?: string;

  /**
   * Specify the legend text.
   * Alternatively, use the named slot "legendChildren".
   * @example
   * ```svelte
   * <CheckboxGroup>
   *   <span slot="legendChildren">Custom Legend</span>
   *   <Checkbox value="a" labelText="Option A" />
   *   <Checkbox value="b" labelText="Option B" />
   * </CheckboxGroup>
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
   * Set an id for the container div element.
   * @default undefined
   */
  id?: string;

  legendChildren?: (this: void) => void;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type CheckboxGroupProps = Omit<$RestProps, keyof $Props> & $Props;

export default class CheckboxGroup extends SvelteComponentTyped<
  CheckboxGroupProps,
  {
    change: CustomEvent<ReadonlyArray<string | number>>;
    click: WindowEventMap["click"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
  },
  { default: Record<string, never>; legendChildren: Record<string, never> }
> {}
