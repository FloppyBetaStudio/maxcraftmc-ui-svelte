import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["span"];

type $Props = {
  /**
   * Specify the tooltip text
   * @default ""
   */
  tooltipText?: string;

  /**
   * Set to `true` to open the tooltip.
   * @default false
   */
  open?: boolean;

  /**
   * Set the alignment of the tooltip relative to the icon.
   * @default "center"
   */
  align?: "start" | "center" | "end";

  /**
   * Set the direction of the tooltip relative to the icon.
   * @default "bottom"
   */
  direction?: "top" | "bottom";

  /**
   * Set an id for the tooltip div element
   * @default `ccs-${Math.random().toString(36)}`
   */
  id?: string;

  /**
   * By default, the tooltip is opened on hover or focus.
   * Set to `true` to open the tooltip on click/focus instead of on hover.
   * Unhovering or blurring the tooltip will close it.
   * @default false
   */
  clickToOpen?: boolean;

  /**
   * Specify the duration in milliseconds to delay before displaying the tooltip.
   * @default 100
   */
  enterDelayMs?: number;

  /**
   * Specify the duration in milliseconds to delay before hiding the tooltip.
   * @default 300
   */
  leaveDelayMs?: number;

  /**
   * Obtain a reference to the button HTML element.
   * @default null
   */
  ref?: null | HTMLButtonElement;

  /**
   * Set to `true` to render the tooltip in a portal,
   * preventing it from being clipped by `overflow: hidden` containers.
   * By default, the tooltip is portalled when inside a `Modal`.
   * @default undefined
   */
  portalTooltip?: boolean | undefined;

  tooltip?: (this: void) => void;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type TooltipDefinitionProps = Omit<$RestProps, keyof $Props> & $Props;

export default class TooltipDefinition extends SvelteComponentTyped<
  TooltipDefinitionProps,
  {
    click: WindowEventMap["click"];
    close: CustomEvent<null>;
    focus: WindowEventMap["focus"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
    open: CustomEvent<null>;
  },
  { default: Record<string, never>; tooltip: Record<string, never> }
> {}
