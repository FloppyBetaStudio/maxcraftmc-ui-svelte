import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["input"];

type $Props<Icon = any> = {
  /**
   * Specify the accepted file types.
   * @default []
   */
  accept?: ReadonlyArray<string>;

  /**
   * Obtain a reference to the uploaded files.
   * @default []
   */
  files?: ReadonlyArray<File>;

  /**
   * Set to `true` to allow multiple files
   * @default false
   */
  multiple?: boolean;

  /**
   * Set to `true` to skip files that match an already-selected file
   * (by name, size, and lastModified). Only applies when `multiple` is `true`.
   * For richer behavior (rejection reporting via the `rejected` event),
   * see `FileUploader`'s `preventDuplicate` prop.
   * @default false
   */
  preventDuplicate?: boolean;

  /**
   * Set to `true` to disable the input
   * @default false
   */
  disabled?: boolean;

  /**
   * Set to `true` to disable label changes
   * @default false
   */
  disableLabelChanges?: boolean;

  /**
   * Specify the kind of file uploader button.
   * @default "primary"
   */
  kind?: import("../Button/Button.svelte").ButtonProps["kind"];

  /**
   * Specify the size of the file uploader button.
   * @default "small"
   */
  size?: import("../Button/Button.svelte").ButtonProps["size"];

  /**
   * Specify the label text.
   * @default "Add file"
   */
  labelText?: string;

  /**
   * Set an id for the input element
   * @default `ccs-${Math.random().toString(36)}`
   */
  id?: string;

  /**
   * Specify a name attribute for the input
   * @default ""
   */
  name?: string;

  /**
   * Obtain a reference to the input HTML element.
   * @default null
   */
  ref?: null | HTMLInputElement;

  /**
   * Specify the icon to render.
   * @default undefined
   */
  icon?: Icon;

  /**
   * Specify the ARIA label for the button icon.
   * @default undefined
   */
  iconDescription?: string;

  /**
   * Set the alignment of the tooltip relative to the icon.
   * Only applies to icon-only buttons.
   * @default "center"
   */
  tooltipAlignment?: "start" | "center" | "end";

  /**
   * Set the position of the tooltip relative to the icon.
   * @default "bottom"
   */
  tooltipPosition?: "top" | "right" | "bottom" | "left";

  /**
   * Set to `true` to hide the tooltip while maintaining accessibility.
   * Only applies to icon-only buttons.
   * When `true`, the tooltip is visually hidden but the `iconDescription` remains accessible to screen readers.
   * @default false
   */
  hideTooltip?: boolean;

  labelChildren?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type FileUploaderButtonProps<Icon = any> = Omit<
  $RestProps,
  keyof $Props<Icon>
> &
  $Props<Icon>;

export default class FileUploaderButton<
  Icon = any,
> extends SvelteComponentTyped<
  FileUploaderButtonProps<Icon>,
  {
    change: CustomEvent<ReadonlyArray<File>>;
    click: WindowEventMap["click"];
    keydown: WindowEventMap["keydown"];
  },
  { labelChildren: Record<string, never> }
> {}
