import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["button"];

type $Props<Icon = any> = {
  /**
   * Specify the tooltip text.
   * Alternatively, use the "tooltipText" slot.
   * Also provides the button's accessible name when neither `aria-label` nor
   * `aria-labelledby` is specified.
   * @default ""
   */
  tooltipText?: string;

  /**
   * Set to `true` to open the tooltip.
   * @default false
   */
  open?: boolean;

  /**
   * Specify the icon to render.
   * @default undefined
   */
  icon?: Icon;

  /**
   * Specify the icon size.
   * Carbon icons use a 16/20/24/32 scale, but any number (pixels) can be used.
   * @default 16
   */
  size?: 16 | 20 | 24 | 32 | (number & {});

  /**
   * Set to `true` to disable the tooltip icon
   * @default false
   */
  disabled?: boolean;

  /**
   * Set the alignment of the tooltip relative to the icon.
   * @default "center"
   */
  align?: "start" | "center" | "end";

  /**
   * Set the direction of the tooltip relative to the icon.
   * @default "bottom"
   */
  direction?: "top" | "right" | "bottom" | "left";

  /**
   * Set an id for the span element
   * @default `ccs-${Math.random().toString(36)}`
   */
  id?: string;

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

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type TooltipIconProps<Icon = any> = Omit<
  $RestProps,
  keyof $Props<Icon>
> &
  $Props<Icon>;

export default class TooltipIcon<Icon = any> extends SvelteComponentTyped<
  TooltipIconProps<Icon>,
  {
    blur: WindowEventMap["blur"];
    click: WindowEventMap["click"];
    close: CustomEvent<null>;
    focus: WindowEventMap["focus"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
    open: CustomEvent<null>;
  },
  { default: Record<string, never>; tooltipText: Record<string, never> }
> {}
