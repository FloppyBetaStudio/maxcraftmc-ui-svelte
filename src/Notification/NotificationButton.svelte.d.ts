import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["button"];

type $Props<Icon = any> = {
  /**
   * Set the type of notification.
   * @default "toast"
   */
  notificationType?: "toast" | "inline";

  /**
   * Specify the icon to render.
   * @default Close
   */
  icon?: Icon;

  /**
   * Specify the title of the icon.
   * @default undefined
   */
  title?: string;

  /**
   * Specify the ARIA label for the icon
   * @default "Close icon"
   */
  iconDescription?: string;

  [key: `data-${string}`]: unknown;
};

export type NotificationButtonProps<Icon = any> = Omit<
  $RestProps,
  keyof $Props<Icon>
> &
  $Props<Icon>;

export default class NotificationButton<
  Icon = any,
> extends SvelteComponentTyped<
  NotificationButtonProps<Icon>,
  {
    click: WindowEventMap["click"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
  },
  Record<string, never>
> {}
