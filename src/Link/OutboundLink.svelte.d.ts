import { SvelteComponentTyped } from "svelte";
import type { LinkProps } from "./Link.svelte";

export type OutboundLinkProps = LinkProps & {
  /**
   * Specify the assistive text announced to screen readers to
   * indicate that the link opens in a new tab.
   * Set to an empty string to opt out of the announcement.
   * @default "(opens in a new tab)"
   */
  assistiveText?: string;

  children?: (this: void) => void;
};

export default class OutboundLink extends SvelteComponentTyped<
  OutboundLinkProps,
  {
    blur: WindowEventMap["blur"];
    click: WindowEventMap["click"];
    focus: WindowEventMap["focus"];
    keydown: WindowEventMap["keydown"];
    keyup: WindowEventMap["keyup"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
  },
  { default: Record<string, never> }
> {}
