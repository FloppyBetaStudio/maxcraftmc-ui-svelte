import { SvelteComponentTyped } from "svelte";

export type FloatingPortalProps = {
  /**
   * Required. Specify the anchor element to position the floating content relative to.
   * When using `bind:this`, this may be `null` initially until the element is mounted.
   * @default undefined
   */
  anchor: null | HTMLElement;

  /**
   * Set the preferred direction of the floating content.
   * The component will flip to the opposite direction
   * if there is not enough space.
   * @default "bottom"
   */
  direction?: "bottom" | "top" | "left" | "right";

  /**
   * Set to `true` to open the floating content.
   * @default false
   */
  open?: boolean;

  /**
   * Vertical gap in pixels when direction is top.
   * @default 0
   */
  gapTop?: number;

  /**
   * Vertical gap in pixels when direction is bottom.
   * @default 0
   */
  gapBottom?: number;

  /**
   * Horizontal gap in pixels when direction is left (space between anchor left and tooltip right).
   * @default 0
   */
  horizontalGapLeft?: number;

  /**
   * Horizontal gap in pixels when direction is right (space between anchor right and tooltip left).
   * @default 0
   */
  horizontalGapRight?: number;

  /**
   * Vertical offset in pixels when direction is left.
   * @default 0
   */
  verticalAlignOffsetLeft?: number;

  /**
   * Vertical offset in pixels when direction is right.
   * @default 0
   */
  verticalAlignOffsetRight?: number;

  /**
   * Specify the z-index of the floating portal.
   * By default, this value supersedes the z-index
   * of modals (9000) and list box menus (9100).
   * @default 9200
   */
  zIndex?: number;

  /**
   * Set to `true` to use the content's intrinsic width instead of the anchor width.
   * Position along the anchor edge is controlled by `intrinsicAlign`.
   * When `false` (default), the portal width matches the anchor.
   * @default false
   */
  intrinsicWidth?: boolean;

  /**
   * When `intrinsicWidth` is true, align the floating box to the anchor (Carbon-style):
   * - `top` / `bottom`: horizontal alignment (`start` = anchor left, `center`, `end` = anchor right).
   * - `left` / `right`: vertical alignment (`start` = anchor top, `center`, `end` = anchor bottom).
   * Ignored when `intrinsicWidth` is false.
   * @default "center"
   */
  intrinsicAlign?: "start" | "center" | "end";

  /**
   * Obtain a reference to the floating portal element.
   * @default null
   */
  ref?: null | HTMLElement;

  /**
   * Specify the DOM element to mount the portal into.
   * When not set, mounts into the anchor's nearest top-layer ancestor —
   * a `<dialog>` or `[popover]` element — if one exists, so the portal
   * participates in the dialog/popover top layer. Otherwise falls back
   * to `document.body`.
   * @default null
   */
  target?: HTMLElement | null;

  children?: (
    this: void,
    ...args: [{ direction: "bottom" | "top" | "left" | "right" }]
  ) => void;
};

export default class FloatingPortal extends SvelteComponentTyped<
  FloatingPortalProps,
  Record<string, any>,
  { default: { direction: "bottom" | "top" | "left" | "right" } }
> {}
