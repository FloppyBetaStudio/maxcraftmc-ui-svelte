import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["a"];

type $Props<Icon = any> = {
  /**
   * Set to `false` to hide the side nav by default
   * @default true
   */
  expandedByDefault?: boolean;

  /**
   * Set to `true` to open the side nav.
   * @default false
   */
  isSideNavOpen?: boolean;

  /**
   * Specify the ARIA label for the header.
   * @default undefined
   */
  uiShellAriaLabel?: string;

  /**
   * Specify the `href` attribute.
   * @default undefined
   */
  href?: string;

  /**
   * Specify the company name.
   *
   * Alternatively, use the named slot "company".
   * @example
   * ```svelte
   * <Header>
   *   <span slot="company">IBM</span>
   * </Header>
   * ```
   * @default undefined
   */
  companyName?: string;

  /**
   * Specify the platform name.
   * Alternatively, use the named slot "platform".
   * @example
   * ```svelte
   * <Header>
   *   <span slot="platform">Platform Name</span>
   * </Header>
   * ```
   * @default ""
   */
  platformName?: string;

  /**
   * Set to `true` to persist the hamburger menu
   * @default false
   */
  persistentHamburgerMenu?: boolean;

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
   * Obtain a reference to the HTML anchor element.
   * @default null
   */
  ref?: null | HTMLAnchorElement;

  /**
   * Specify the icon to render for the closed state.
   * @default Menu
   */
  iconMenu?: Icon;

  /**
   * Specify the icon to render for the opened state.
   * @default Close
   */
  iconClose?: Icon;

  /**
   * Specify the ARIA label for the hamburger menu.
   * Defaults to "Open menu" or "Close menu" based on `isSideNavOpen` state.
   * @default undefined
   */
  ariaLabelMenu?: string;

  /**
   * Set to `"classic"` for the mixed UI Shell theme (Gray 100 header).
   * Use with `SideNav` `theme="classic"` (White side nav).
   * Requires `carbon-components-svelte/css/all.css`.
   * @default undefined
   */
  theme?: "classic" | undefined;

  company?: (this: void) => void;

  platform?: (this: void) => void;

  skipToContent?: (this: void) => void;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type HeaderProps<Icon = any> = Omit<$RestProps, keyof $Props<Icon>> &
  $Props<Icon>;

export default class Header<Icon = any> extends SvelteComponentTyped<
  HeaderProps<Icon>,
  { click: WindowEventMap["click"] },
  {
    default: Record<string, never>;
    company: Record<string, never>;
    platform: Record<string, never>;
    skipToContent: Record<string, never>;
  }
> {}
