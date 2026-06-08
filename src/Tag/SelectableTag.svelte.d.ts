import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["button"];

type $Props<Icon = any> = {
  /**
   * Set to `true` to select the tag.
   * @default false
   */
  selected?: boolean;

  /**
   * Specify the type of tag.
   * @default undefined
   */
  type?:
    | "red"
    | "magenta"
    | "purple"
    | "blue"
    | "cyan"
    | "teal"
    | "green"
    | "gray"
    | "cool-gray"
    | "warm-gray"
    | "high-contrast"
    | "outline";

  /**
   * @default "default"
   */
  size?: "sm" | "default";

  /**
   * Set to `true` to disable the tag
   * @default false
   */
  disabled?: boolean;

  /**
   * Specify the icon to render.
   * @default undefined
   */
  icon?: Icon;

  /**
   * Set an id for the tag
   * @default `ccs-${Math.random().toString(36)}`
   */
  id?: string;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type SelectableTagProps<Icon = any> = Omit<
  $RestProps,
  keyof $Props<Icon>
> &
  $Props<Icon>;

export default class SelectableTag<Icon = any> extends SvelteComponentTyped<
  SelectableTagProps<Icon>,
  {
    change: CustomEvent<{ selected: boolean }>;
    click: WindowEventMap["click"];
    keydown: WindowEventMap["keydown"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
  },
  { default: Record<string, never>; icon: Record<string, never> }
> {}
