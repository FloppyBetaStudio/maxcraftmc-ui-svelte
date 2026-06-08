import { SvelteComponentTyped } from "svelte";

export type NotificationData = {
  /** Optional id for deduplication */
  id?: string;
  kind?:
    | "error"
    | "info"
    | "info-square"
    | "success"
    | "warning"
    | "warning-alt";
  title?: string;
  subtitle?: string;
  caption?: string;
  timeout?: number;
  lowContrast?: boolean;
  closeButtonDescription?: string;
  hideCloseButton?: boolean;
};

export type NotificationQueueProps = {
  /**
   * Specify the position of the notification queue.
   * @default "top-right"
   */
  position?: "top-right" | "bottom-right";

  /**
   * Specify the top offset (CSS value)
   * @default "3rem"
   */
  offsetTop?: string;

  /**
   * Specify the bottom offset (CSS value)
   * @default "1rem"
   */
  offsetBottom?: string;

  /**
   * Specify the right offset (CSS value)
   * @default "1rem"
   */
  offsetRight?: string;

  /**
   * Specify the z-index of the notification queue.
   * By default, this matches the z-index of modals.
   * @default 9000
   */
  zIndex?: number;

  /**
   * Specify the maximum number of notifications to display.
   * When this limit is exceeded, the oldest notification is automatically removed.
   * @default 3
   */
  maxNotifications?: number;
};

export default class NotificationQueue extends SvelteComponentTyped<
  NotificationQueueProps,
  Record<string, any>,
  Record<string, never>
> {
  /**
   * Add a notification to the queue.
   * If a notification with the same id already exists, the call is ignored.
   * To change an existing notification in place, use `update`.
   * Returns the notification id (either the provided id or a generated one).
   */
  add: (notification: NotificationData) => string;

  /**
   * Update an existing notification by id, merging `patch` into it.
   * The id of the notification cannot be changed.
   * Returns true if the notification was found and updated, false otherwise.
   */
  update: (id: string, patch: Partial<NotificationData>) => boolean;

  /**
   * Remove a notification by id.
   * Returns true if the notification was found and removed, false otherwise.
   */
  remove: (id: string) => boolean;

  /**
   * Clear all notifications.
   */
  clear: () => any;
}
