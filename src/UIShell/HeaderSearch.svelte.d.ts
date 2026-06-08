import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export type HeaderSearchResult = {
  /** Unique result identifier; used as the each-block key when provided */
  id?: string | number;
  href: string;
  text: string;
  description?: string;
};

type $RestProps = SvelteHTMLElements["input"];

type $Props<Result extends HeaderSearchResult = HeaderSearchResult> = {
  /**
   * Specify the search input value.
   * @default ""
   */
  value?: string;

  /**
   * Set to `true` to activate and focus the search bar.
   * @default false
   */
  active?: boolean;

  /**
   * Obtain a reference to the input HTML element.
   * @default null
   */
  ref?: null | HTMLInputElement;

  /**
   * Render a list of search results.
   * @default []
   */
  results?: ReadonlyArray<Result>;

  /**
   * Specify the selected result index.
   * @default 0
   */
  selectedResultIndex?: number;

  children?: (this: void, ...args: [{ result: Result; index: number }]) => void;

  [key: `data-${string}`]: unknown;
};

export type HeaderSearchProps<
  Result extends HeaderSearchResult = HeaderSearchResult,
> = Omit<$RestProps, keyof $Props<Result>> & $Props<Result>;

export default class HeaderSearch<
  Result extends HeaderSearchResult = HeaderSearchResult,
> extends SvelteComponentTyped<
  HeaderSearchProps<Result>,
  {
    active: CustomEvent<null>;
    blur: WindowEventMap["blur"];
    change: WindowEventMap["change"];
    clear: CustomEvent<null>;
    focus: WindowEventMap["focus"];
    inactive: CustomEvent<null>;
    input: WindowEventMap["input"];
    keydown: WindowEventMap["keydown"];
    paste: WindowEventMap["paste"];
    select: CustomEvent<{
      value: string;
      selectedResultIndex: number;
      selectedResult: Result;
    }>;
  },
  { default: { result: Result; index: number } }
> {}
