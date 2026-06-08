import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["div"] & SvelteHTMLElements["span"];

type $Props<Icon = any> = {
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
  size?: "sm" | "default" | "lg";

  /**
   * Set to `true` to use filterable variant
   * @default false
   */
  filter?: boolean;

  /**
   * Set to `true` to disable a filterable tag
   * @default false
   */
  disabled?: boolean;

  /**
   * Set to `true` to render a `button` element instead of a `div`
   * @default false
   */
  interactive?: boolean;

  /**
   * Set to `true` to display the skeleton state
   * @default false
   */
  skeleton?: boolean;

  /**
   * Set the title for the close button in a filterable tag
   * @default "Clear filter"
   */
  title?: string;

  /**
   * Specify the icon to render.
   * @default undefined
   */
  icon?: Icon;

  /**
   * Set an id for the filterable tag
   * @default `ccs-${Math.random().toString(36)}`
   */
  id?: string;

  children?: (
    this: void,
    ...args: [{ props: { class: "bx--tag__label" } }]
  ) => void;

  [key: `data-${string}`]: unknown;
};

export type TagProps<Icon = any> = Omit<$RestProps, keyof $Props<Icon>> &
  $Props<Icon>;

export default class Tag<Icon = any> extends SvelteComponentTyped<
  TagProps<Icon>,
  {
    click: WindowEventMap["click"];
    close: CustomEvent<null>;
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
  },
  {
    default: { props: { class: "bx--tag__label" } };
    icon: Record<string, never>;
  }
> {}
