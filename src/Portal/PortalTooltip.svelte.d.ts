import { SvelteComponentTyped } from "svelte";

export type PortalTooltipProps = {
  /**
   * Element to position the tooltip next to.
   * @default null
   */
  anchor?: null | HTMLElement;

  /**
   * Preferred edge of the anchor to place the tooltip.
   * The underlying `FloatingPortal` flips to the opposite side when there is not enough space.
   * @default "top"
   */
  direction?: "bottom" | "top" | "left" | "right";

  /**
   * Set to `true` to show the tooltip in the portal.
   * @default false
   */
  open?: boolean;

  /**
   * Text shown when the default slot is empty.
   * @default ""
   */
  text?: string;

  /**
   * When `"icon"` or `"definition"`, sets `data-tooltip-type` and applies Carbon
   * `tooltip--content` typography to the portalled body (via package CSS).
   * @default undefined
   */
  tooltipType?: "icon" | "definition" | undefined;

  /**
   * Set on the portalled content when using a11y tooltips (`role="tooltip"`).
   * @default undefined
   */
  id?: string | undefined;

  /**
   * Extra horizontal space (px) between anchor and tooltip when placed to the left of the anchor.
   * @default 0
   */
  horizontalGapLeft?: number;

  /**
   * Extra horizontal space (px) between anchor and tooltip when placed to the right of the anchor.
   * @default 0
   */
  horizontalGapRight?: number;

  /**
   * Extra vertical space (px) between anchor and tooltip when placed above the anchor.
   * @default 0
   */
  gapTop?: number;

  /**
   * Extra vertical space (px) between anchor and tooltip when placed below the anchor.
   * @default 0
   */
  gapBottom?: number;

  /**
   * Vertical nudge (px) when the tooltip is placed to the left of the anchor (`intrinsicAlign` along the vertical edge).
   * @default 0
   */
  verticalAlignOffsetLeft?: number;

  /**
   * Vertical nudge (px) when the tooltip is placed to the right of the anchor (`intrinsicAlign` along the vertical edge).
   * @default 0
   */
  verticalAlignOffsetRight?: number;

  /**
   * Align portalled tooltip to the anchor (see `FloatingPortal` `intrinsicAlign`).
   * @default "center"
   */
  intrinsicAlign?: "start" | "center" | "end";

  children?: (this: void) => void;
};

export default class PortalTooltip extends SvelteComponentTyped<
  PortalTooltipProps,
  Record<string, any>,
  { default: Record<string, never> }
> {}
