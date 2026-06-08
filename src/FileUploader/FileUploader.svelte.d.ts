import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["div"];

type $Props = {
  /**
   * Specify the file uploader status.
   * @default "uploading"
   */
  status?: "uploading" | "edit" | "complete";

  /**
   * Set to `true` to disable the file uploader
   * @default false
   */
  disabled?: boolean;

  /**
   * Specify the accepted file types.
   * @default []
   */
  accept?: ReadonlyArray<string>;

  /**
   * Specify the maximum file size in bytes.
   * Files exceeding this limit will be filtered out.
   * File sizes use binary (base 2) units: 1024 bytes = 1 KiB, not 1000 bytes.
   * @example
   * ```svelte
   * <!-- 5 MB = 5 × 1024 × 1024 = 5,242,880 bytes -->
   * <FileUploader maxFileSize={5 * 1024 * 1024} />
   * ```
   * @default undefined
   */
  maxFileSize?: number | undefined;

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
   * Set to `true` to reject files that match an already-selected file
   * (by name, size, and lastModified). Rejected duplicates are reported
   * via the `rejected` event with `reason: 'duplicate'`.
   * @default false
   */
  preventDuplicate?: boolean;

  /**
   * Control how newly added files are ordered in the list.
   * - `"append"` (default): new files appear at the end
   * - `"prepend"`: new files appear at the beginning
   * - A custom function receiving (existingFiles, newFiles) that returns the merged array
   * @default "append"
   */
  orderFiles?:
    | "append"
    | "prepend"
    | ((
        existing: ReadonlyArray<File>,
        added: ReadonlyArray<File>,
      ) => ReadonlyArray<File>);

  /**
   * Specify the label title.
   * Alternatively, use the named slot "labelTitle".
   * @example
   * ```svelte
   * <FileUploader>
   *   <span slot="labelTitle">Custom Label</span>
   * </FileUploader>
   * ```
   * @default ""
   */
  labelTitle?: string;

  /**
   * Specify the label description.
   * Alternatively, use the named slot "labelDescription".
   * @example
   * ```svelte
   * <FileUploader>
   *   <span slot="labelDescription">Custom description text</span>
   * </FileUploader>
   * ```
   * @default ""
   */
  labelDescription?: string;

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
   * Specify the button label
   * @default ""
   */
  buttonLabel?: string;

  /**
   * Accessible label for file row status icons (spinner, remove control, checkmark).
   * Forwarded to `Filename`. Use a string, or a function with context `{ file, fileName, status, invalid }`
   * where `file` is the row's `File` (only set from `FileUploader`, not from `FileUploaderItem`).
   * When omitted or the resolved value is blank after trim, `Filename` uses built-in defaults.
   * @default undefined
   */
  iconDescription?:
    | string
    | undefined
    | ((ctx: {
        file?: File;
        fileName: string;
        status: "uploading" | "edit" | "complete";
        invalid: boolean;
      }) => string | undefined);

  /**
   * Specify a name attribute for the file button uploader input
   * @default ""
   */
  name?: string;

  /**
   * Obtain a reference to the input HTML element.
   * @default null
   */
  ref?: null | HTMLInputElement;

  [key: `data-${string}`]: unknown;
};

export type FileUploaderProps = Omit<$RestProps, keyof $Props> & $Props;

export default class FileUploader extends SvelteComponentTyped<
  FileUploaderProps,
  {
    add: CustomEvent<ReadonlyArray<File>>;
    change: CustomEvent<ReadonlyArray<File>>;
    clear: CustomEvent<void>;
    click: WindowEventMap["click"];
    keydown: WindowEventMap["keydown"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
    rejected: CustomEvent<Array<{ file: File; reason: "size" | "duplicate" }>>;
    remove: CustomEvent<ReadonlyArray<File>>;
  },
  { labelDescription: Record<string, never>; labelTitle: Record<string, never> }
> {
  /**
   * Programmatically clear the uploaded files.
   * @example
   * ```svelte
   * <FileUploader bind:this={uploader} bind:files={files} />
   * <button on:click={() => uploader.clearFiles()}>Clear Files</button>
   * ```
   */
  clearFiles: () => void;
}
