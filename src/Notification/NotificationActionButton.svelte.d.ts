import { SvelteComponentTyped } from "svelte";
import type { ButtonProps } from "../Button/Button.svelte";

export type NotificationActionButtonProps = ButtonProps & {
  children?: (this: void) => void;
};

export default class NotificationActionButton extends SvelteComponentTyped<
  NotificationActionButtonProps,
  {
    click: WindowEventMap["click"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
  },
  { default: Record<string, never> }
> {}
