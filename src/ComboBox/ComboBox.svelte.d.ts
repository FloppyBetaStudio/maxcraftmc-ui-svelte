import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export type ComboBoxItem<Id = any> = {
  id: Id;
  text: string;
  /** Whether the item is disabled */
  disabled?: boolean;
};

type $RestProps = SvelteHTMLElements["input"];

type $Props<Item extends ComboBoxItem<any> = ComboBoxItem<any>> = {
  /**
   * Set the combobox items.
   * @default []
   */
  items?: ReadonlyArray<Item>;

  /**
   * Override the display of a combobox item.
   */
  itemToString?: (item: Item) => string;

  /**
   * Set the selected item by value id.
   * @default undefined
   */
  selectedId?: Item["id"];

  /**
   * Specify the selected combobox value.
   * @default ""
   */
  value?: string;

  /**
   * Specify the direction of the combobox dropdown menu.
   * @default "bottom"
   */
  direction?: "bottom" | "top";

  /**
   * Set the size of the combobox.
   * @default undefined
   */
  size?: "sm" | "lg" | "xl";

  /**
   * Set to `true` to disable the combobox
   * @default false
   */
  disabled?: boolean;

  /**
   * Specify the title text of the combobox
   * @default ""
   */
  labelText?: string;

  /**
   * Set to `true` to visually hide the label text
   * @default false
   */
  hideLabel?: boolean;

  /**
   * Specify the placeholder text
   * @default ""
   */
  placeholder?: string;

  /**
   * Specify the helper text
   * @default ""
   */
  helperText?: string;

  /**
   * Specify the invalid state text
   * @default ""
   */
  invalidText?: string;

  /**
   * Set to `true` to indicate an invalid state
   * @default false
   */
  invalid?: boolean;

  /**
   * Set to `true` to indicate a warning state
   * @default false
   */
  warn?: boolean;

  /**
   * Specify the warning state text
   * @default ""
   */
  warnText?: string;

  /**
   * Set to `true` to enable the light variant
   * @default false
   */
  light?: boolean;

  /**
   * Set to `true` to open the combobox menu dropdown.
   * @default false
   */
  open?: boolean;

  /**
   * Set to `true` to use the read-only variant
   * @default false
   */
  readonly?: boolean;

  /**
   * Set to `true` to allow custom values that are not in the items list.
   * By default, user-entered text is cleared when the combobox loses focus without selecting an item.
   * When enabled, custom text is preserved.
   * @default false
   */
  allowCustomValue?: boolean;

  /**
   * Set to `true` to clear the input value when opening the dropdown.
   * This allows users to see all available items instead of only filtered results.
   * The original value is restored if the dropdown is closed without making a selection.
   * @default false
   */
  clearFilterOnOpen?: boolean;

  /**
   * Set to `true` to select all text in the input when it receives focus (e.g. on tab or click).
   * @default false
   */
  selectTextOnFocus?: boolean;

  /**
   * Set to `true` to reopen the dropdown menu after clearing the selection.
   * This allows users to immediately see all available items after clearing.
   * @default false
   */
  openOnClear?: boolean;

  /**
   * Set to `true` to enable autocomplete with typeahead
   * @default false
   */
  typeahead?: boolean;

  /**
   * Control whether the first matching item is automatically highlighted as the user types.
   * - `"none"`: No auto-highlighting (default). The user must use arrow keys or hover to highlight items.
   * - `"first-match"`: Automatically highlight the first non-disabled filtered item on each input change.
   * @default "none"
   */
  autoHighlight?: "none" | "first-match";

  /**
   * Determine if an item should be filtered given the current combobox value.
   * When `typeahead` is enabled and no custom function is provided,
   * the default case-insensitive prefix matching is used.
   * When a custom function is provided, it is used even with `typeahead`.
   * @default () => true
   */
  shouldFilterItem?: (item: Item, value: string) => boolean;

  /**
   * Override the chevron icon label based on the open state.
   * Defaults to "Open menu" when closed and "Close menu" when open.
   * @default undefined
   */
  translateWithId?: (
    id: import("../ListBox/ListBoxMenuIcon.svelte").ListBoxMenuIconTranslationId,
  ) => string;

  /**
   * Override the label of the clear button when the input has a selection.
   * Defaults to "Clear selected item" since a combo box can only have one selection.
   * @default undefined
   */
  translateWithIdSelection?: (id: "clearSelection") => string;

  /**
   * Set an id for the list box component
   * @default `ccs-${Math.random().toString(36)}`
   */
  id?: string;

  /**
   * Specify a name attribute for the input.
   * @default undefined
   */
  name?: string;

  /**
   * Obtain a reference to the input HTML element.
   * @default null
   */
  ref?: null | HTMLInputElement;

  /**
   * Obtain a reference to the list HTML element.
   * @default null
   */
  listRef?: null | HTMLDivElement;

  /**
   * Enable virtualization for large lists. Virtualization renders only the items currently visible in the viewport, improving performance for large lists.
   *
   * By default, virtualization is automatically enabled for lists with more than 100 items.
   *
   * Set `virtualize={false}` to explicitly disable virtualization, even for large lists.
   *
   * Set `virtualize={true}` to explicitly enable virtualization with default settings.
   *
   * Provide an object to customize virtualization behavior:
   * - `itemHeight` (default: 40): The height in pixels of each item. Specify a custom value when using custom slots with multi-line items or different heights.
   * - `containerHeight` (default: 300): The maximum height in pixels of the dropdown container.
   * - `overscan` (default: 3): The number of extra items to render above and below the viewport for smoother scrolling. Higher values may cause more flickering during very fast scrolling.
   * - `threshold` (default: 100): The minimum number of items required before virtualization activates. Lists with fewer items will render all items normally without virtualization.
   * - `maxItems` (default: undefined): The maximum number of items to render. When undefined, all visible items are rendered.
   * @default undefined
   */
  virtualize?:
    | undefined
    | boolean
    | {
        itemHeight?: number;
        containerHeight?: number;
        overscan?: number;
        threshold?: number;
        maxItems?: number;
      };

  /**
   * Set to `true` to render the dropdown menu in a portal,
   * allowing it to escape containers with `overflow: hidden`.
   * When inside a Modal, defaults to `true` unless explicitly set to `false`.
   * @default undefined
   */
  portalMenu?: boolean | undefined;

  labelChildren?: (this: void) => void;

  children?: (this: void, ...args: [{ item: Item; index: number }]) => void;

  [key: `data-${string}`]: unknown;
};

export type ComboBoxProps<Item extends ComboBoxItem<any> = ComboBoxItem<any>> =
  Omit<$RestProps, keyof $Props<Item>> & $Props<Item>;

export default class ComboBox<
  Item extends ComboBoxItem<any> = ComboBoxItem<any>,
> extends SvelteComponentTyped<
  ComboBoxProps<Item>,
  {
    blur: WindowEventMap["blur"];
    clear: CustomEvent<KeyboardEvent | MouseEvent>;
    focus: WindowEventMap["focus"];
    input: WindowEventMap["input"];
    keydown: WindowEventMap["keydown"];
    keyup: WindowEventMap["keyup"];
    paste: WindowEventMap["paste"];
    scroll: WindowEventMap["scroll"];
    select: CustomEvent<{
      selectedId: Item["id"];
      selectedItem: Item;
    }>;
  },
  {
    default: { item: Item; index: number };
    labelChildren: Record<string, never>;
  }
> {
  /**
   * Clear the combo box programmatically.
   * By default, focuses the combo box after clearing. Set `options.focus` to `false` to prevent focusing.
   * Set `options.open` to `true` to keep the dropdown open after clearing.
   * @example
   * ```svelte
   * <ComboBox bind:this={comboBox} items={items} />
   * <button on:click={() => comboBox.clear()}>Clear</button>
   * <button on:click={() => comboBox.clear({ focus: false })}>Clear (No Focus)</button>
   * ```
   */
  clear: (options?: { focus?: boolean; open?: boolean }) => Promise<void>;
}
