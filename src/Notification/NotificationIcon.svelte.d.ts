import { SvelteComponentTyped } from "svelte";

export type NotificationIconProps = {
  /**
   * Specify the kind of notification icon.
   * @default "error"
   */
  kind?:
    | "error"
    | "info"
    | "info-square"
    | "success"
    | "warning"
    | "warning-alt";

  /**
   * Set the type of notification.
   * @default "toast"
   */
  notificationType?: "toast" | "inline";
};

export default class NotificationIcon extends SvelteComponentTyped<
  NotificationIconProps,
  Record<string, any>,
  Record<string, never>
> {}
