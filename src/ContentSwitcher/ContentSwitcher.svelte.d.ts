import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export type CarbonContentSwitcherContext = {
  currentId: import("svelte/store").Writable<string | null>;
  add: (data: { id: string; text: string; selected: boolean }) => void;
  remove: (id: string) => void;
  update: (id: string) => void;
  change: (direction: number) => Promise<void>;
  changeTo: (index: number) => Promise<void>;
  /** Move focus to the next/previous switch without changing selection. */
  focus: (direction: number) => Promise<void>;
  /** Move focus to a switch at an absolute index without changing selection. */
  focusTo: (index: number) => Promise<void>;
  switchCount: () => any;
  selectionMode: () => any;
};

type $RestProps = SvelteHTMLElements["div"];

type $Props = {
  /**
   * Set the selected index of the switch item.
   * @default 0
   */
  selectedIndex?: number;

  /**
   * Specify the size of the content switcher.
   * @default undefined
   */
  size?: "sm" | "xl";

  /**
   * Choose whether or not to automatically change selection
   * on focus when using arrow keys. Defaults to "automatic".
   * @default "automatic"
   */
  selectionMode?: "automatic" | "manual";

  /**
   * Obtain a reference to the tablist HTML element.
   * @default null
   */
  ref?: null | HTMLDivElement;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type ContentSwitcherProps = Omit<$RestProps, keyof $Props> & $Props;

export default class ContentSwitcher extends SvelteComponentTyped<
  ContentSwitcherProps,
  {
    blur: WindowEventMap["blur"];
    change: CustomEvent<number>;
    click: WindowEventMap["click"];
    focus: WindowEventMap["focus"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
  },
  { default: Record<string, never> }
> {}
