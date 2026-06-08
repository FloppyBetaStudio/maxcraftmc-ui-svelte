import { SvelteComponentTyped } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

type $RestProps = HTMLAttributes<HTMLElement>;

type $Props = {
  /**
   * Specify the tag name.
   * @default "div"
   */
  tag?: keyof HTMLElementTagNameMap;

  /**
   * Specify the DOM element to mount the portal into.
   * Defaults to `document.body`.
   * @default null
   */
  target?: HTMLElement | null;

  /**
   * Obtain a reference to the portal element.
   * @default null
   */
  ref?: null | HTMLElement;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type PortalProps = Omit<$RestProps, keyof $Props> & $Props;

export default class Portal extends SvelteComponentTyped<
  PortalProps,
  Record<string, any>,
  { default: Record<string, never> }
> {}
