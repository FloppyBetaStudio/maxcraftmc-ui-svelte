import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export type CarbonFormContext = {
  /** Context published under the key `"carbon:Form"` for descendant inputs.
Custom fluid-aware inputs can subscribe with:
`const ctx = getContext("carbon:Form");`
and read `ctx.isFluid` to adapt their rendering. */
  formContext: { isFluid: boolean };
};

type $RestProps = SvelteHTMLElements["form"];

type $Props = {
  /**
   * Obtain a reference to the form element.
   * @default null
   */
  ref?: null | HTMLFormElement;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type FluidFormProps = Omit<$RestProps, keyof $Props> & $Props;

export default class FluidForm extends SvelteComponentTyped<
  FluidFormProps,
  {
    click: WindowEventMap["click"];
    keydown: WindowEventMap["keydown"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
    submit: WindowEventMap["submit"];
  },
  { default: Record<string, never> }
> {}
