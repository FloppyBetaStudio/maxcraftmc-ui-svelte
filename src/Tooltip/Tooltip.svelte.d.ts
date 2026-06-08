import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export type CarbonTooltipContext = {
  tooltipOpen: import("svelte/store").Writable<boolean>;
};

type $RestProps = SvelteHTMLElements["div"];

type $Props<Icon = any> = {
  /**
   * Set the alignment of the tooltip relative to the icon.
   * @default "center"
   */
  align?: "start" | "center" | "end";

  /**
   * Set the direction of the tooltip relative to the button.
   * @default "bottom"
   */
  direction?: "top" | "right" | "bottom" | "left";

  /**
   * Set to `true` to open the tooltip.
   * @default false
   */
  open?: boolean;

  /**
   * Set to `true` to hide the tooltip icon.
   * @default false
   */
  hideIcon?: boolean;

  /**
   * Specify the icon to render for the tooltip button.
   * Defaults to `<Information />`.
   * @default Information
   */
  icon?: Icon;

  /**
   * Specify the ARIA label for the tooltip button
   * @default ""
   */
  iconDescription?: string;

  /**
   * Specify the icon name attribute
   * @default ""
   */
  iconName?: string;

  /**
   * Set the button tabindex
   * @default "0"
   */
  tabindex?: number | string | undefined;

  /**
   * Set an id for the tooltip.
   * @default `ccs-${Math.random().toString(36)}`
   */
  tooltipId?: string;

  /**
   * Set an id for the tooltip button.
   * @default `ccs-${Math.random().toString(36)}`
   */
  triggerId?: string;

  /**
   * Set the tooltip button text
   * @default ""
   */
  triggerText?: string;

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
   * Obtain a reference to the trigger text HTML element.
   * @default null
   */
  ref?: null | HTMLDivElement;

  /**
   * Obtain a reference to the tooltip HTML element.
   * @default null
   */
  refTooltip?: null | HTMLDivElement;

  /**
   * Obtain a reference to the icon HTML element.
   * @default null
   */
  refIcon?: null | HTMLDivElement;

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

export type TooltipProps<Icon = any> = Omit<$RestProps, keyof $Props<Icon>> &
  $Props<Icon>;

export default class Tooltip<Icon = any> extends SvelteComponentTyped<
  TooltipProps<Icon>,
  {
    click: WindowEventMap["click"];
    close: CustomEvent<null>;
    mousedown: WindowEventMap["mousedown"];
    open: CustomEvent<null>;
  },
  {
    default: Record<string, never>;
    icon: Record<string, never>;
    triggerText: Record<string, never>;
  }
> {}
