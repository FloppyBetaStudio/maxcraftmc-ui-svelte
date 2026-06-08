import { SvelteComponentTyped } from "svelte";
import type { ButtonProps } from "../Button/Button.svelte";

export type HeaderGlobalActionProps<Icon = any> = ButtonProps & {
  /**
   * Set to `true` to use the active variant
   * @default false
   */
  isActive?: boolean;

  /**
   * Specify the icon to render.
   * @default undefined
   */
  icon?: Icon;

  /**
   * Obtain a reference to the HTML button element.
   * @default null
   */
  ref?: HTMLButtonElement;
};

export default class HeaderGlobalAction<
  Icon = any,
> extends SvelteComponentTyped<
  HeaderGlobalActionProps<Icon>,
  { click: WindowEventMap["click"] },
  Record<string, never>
> {}
