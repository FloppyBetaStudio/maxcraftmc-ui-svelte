import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["nav"];

type $Props = {
  /**
   * Set to `true` to use the fixed variant
   * @default false
   */
  fixed?: boolean;

  /**
   * Set to `true` to use the rail variant
   * @default false
   */
  rail?: boolean;

  /**
   * Specify the ARIA label for the nav.
   * @default undefined
   */
  ariaLabel?: string;

  /**
   * Set to `true` to toggle the expanded state.
   * @default false
   */
  isOpen?: boolean;

  /**
   * The window width (px) at which the SideNav is expanded and the hamburger menu is hidden.
   * 1056 represents the "large" breakpoint in pixels from the Carbon Design System:
   * - small: 320
   * - medium: 672
   * - large: 1056
   * - x-large: 1312
   * - max: 1584.
   * @default 1056
   */
  expansionBreakpoint?: number;

  /**
   * Set to `"classic"` for the mixed UI Shell theme (White side nav).
   * Use with `Header` `theme="classic"` (Gray 100 header).
   * Requires `carbon-components-svelte/css/all.css`.
   * @default undefined
   */
  theme?: "classic" | undefined;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type SideNavProps = Omit<$RestProps, keyof $Props> & $Props;

export default class SideNav extends SvelteComponentTyped<
  SideNavProps,
  {
    "click:overlay": CustomEvent<null>;
    close: CustomEvent<null>;
    open: CustomEvent<null>;
  },
  { default: Record<string, never> }
> {}
