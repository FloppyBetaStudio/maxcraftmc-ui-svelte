import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export type CarbonOverflowMenuContext = {
  focusedId: import("svelte/store").Writable<string | undefined>;
  items: import("svelte/store").Writable<
    ReadonlyArray<{
      id: string;
      text: string;
      primaryFocus: boolean;
      disabled: boolean;
      index: number;
    }>
  >;
  itemsById: import("svelte/store").Readable<
    Record<
      string,
      {
        id: string;
        text: string;
        primaryFocus: boolean;
        disabled: boolean;
        index: number;
      }
    >
  >;
  add: (data: {
    id: string;
    text: string;
    primaryFocus: boolean;
    disabled: boolean;
  }) => void;
  remove: (id: string) => void;
  update: (
    id: string,
    item: {
      id: string;
      text: string;
      primaryFocus: boolean;
      disabled: boolean;
      index: number;
    },
  ) => void;
  change: (direction: number) => void;
  first: any;
  last: any;
};

type $RestProps = SvelteHTMLElements["button"];

type $Props<Icon = any> = {
  /**
   * Specify the size of the overflow menu.
   * @default undefined
   */
  size?: "sm" | "xl";

  /**
   * Specify the direction of the overflow menu relative to the button.
   * @default "bottom"
   */
  direction?: "top" | "bottom";

  /**
   * Set to `true` to open the menu.
   * @default false
   */
  open?: boolean;

  /**
   * Set to `true` to enable the light variant
   * @default false
   */
  light?: boolean;

  /**
   * Set to `true` to disable the trigger button
   * @default false
   */
  disabled?: boolean;

  /**
   * Set to `true` to flip the menu relative to the button
   * @default false
   */
  flipped?: boolean;

  /**
   * Specify the menu options class.
   * @default undefined
   */
  menuOptionsClass?: string;

  /**
   * Specify the icon to render.
   * @default OverflowMenuVertical
   */
  icon?: Icon;

  /**
   * Specify the icon class.
   * @default undefined
   */
  iconClass?: string;

  /**
   * Specify the ARIA label for the icon
   * @default "Open and close list of options"
   */
  iconDescription?: string;

  /**
   * Set an id for the button element
   * @default `ccs-${Math.random().toString(36)}`
   */
  id?: string;

  /**
   * Obtain a reference to the trigger button element.
   * @default null
   */
  buttonRef?: null | HTMLButtonElement;

  /**
   * Obtain a reference to the overflow menu element.
   * @default null
   */
  menuRef?: null | HTMLUListElement;

  /**
   * Set to `true` to render the menu in a portal,
   * allowing it to escape containers with `overflow: hidden`.
   * When inside a Modal, defaults to `true` unless explicitly set to `false`.
   * @default undefined
   */
  portalMenu?: boolean | undefined;

  menu?: (this: void) => void;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type OverflowMenuProps<Icon = any> = Omit<
  $RestProps,
  keyof $Props<Icon>
> &
  $Props<Icon>;

export default class OverflowMenu<Icon = any> extends SvelteComponentTyped<
  OverflowMenuProps<Icon>,
  {
    click: WindowEventMap["click"];
    close: CustomEvent<{
      index?: number;
      text?: string;
    }>;
    keydown: WindowEventMap["keydown"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
  },
  { default: Record<string, never>; menu: Record<string, never> }
> {}
