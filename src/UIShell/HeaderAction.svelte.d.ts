import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["button"];

type $Props<Icon = any> = {
  /**
   * Set to `true` to open the panel.
   * @default false
   */
  isOpen?: boolean;

  /**
   * Specify the icon to render when the action panel is closed.
   * @default Switcher
   */
  icon?: Icon;

  /**
   * Specify the icon to render when the action panel is open.
   * @default Close
   */
  closeIcon?: Icon;

  /**
   * Specify the text displayed next to the icon.
   * Alternatively, use the named slot "textChildren".
   * @example
   * ```svelte
   * <HeaderAction>
   *   <div slot="textChildren">Custom Text</div>
   * </HeaderAction>
   * ```
   * @default undefined
   */
  text?: string;

  /**
   * Specify an icon tooltip. The tooltip will not be displayed
   * if either the `text` prop or a named slot="textChildren" is used.
   * @default undefined
   */
  iconDescription?: string;

  /**
   * Set the alignment of the tooltip relative to the icon.
   * Only applies when `iconDescription` is provided.
   * @default "center"
   */
  tooltipAlignment?: "start" | "center" | "end";

  /**
   * Obtain a reference to the button HTML element.
   * @default null
   */
  ref?: null | HTMLButtonElement;

  /**
   * Customize the panel transition (i.event., `transition:slide`).
   * Set to `false` to disable the transition.
   * @default { duration: 200 }
   */
  transition?: false | import("svelte/transition").SlideParams;

  /**
   * Set to `true` to prevent the panel from closing when clicking outside
   * @default false
   */
  preventCloseOnClickOutside?: boolean;

  textChildren?: (this: void) => void;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type HeaderActionProps<Icon = any> = Omit<
  $RestProps,
  keyof $Props<Icon>
> &
  $Props<Icon>;

export default class HeaderAction<Icon = any> extends SvelteComponentTyped<
  HeaderActionProps<Icon>,
  {
    click: WindowEventMap["click"];
    close: CustomEvent<null>;
    open: CustomEvent<null>;
  },
  {
    default: Record<string, never>;
    closeIcon: Record<string, never>;
    icon: Record<string, never>;
    textChildren: Record<string, never>;
  }
> {}
