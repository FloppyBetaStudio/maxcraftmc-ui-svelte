import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export type FilenameIconDescriptionContext = {
  /** Set when rendered from `FileUploader` rows; otherwise `undefined`. */
  file?: File | undefined;
  /** Display name (`file.name` or `FileUploaderItem` `name`). */
  fileName: string;
  status: "uploading" | "edit" | "complete";
  invalid: boolean;
};

type $RestProps = SvelteHTMLElements["div"] &
  SvelteHTMLElements["button"] &
  SvelteHTMLElements["svg"];

type $Props = {
  /**
   * Specify the file name status.
   * @default "uploading"
   */
  status?: "uploading" | "edit" | "complete";

  /**
   * Accessible label for the status icons (spinner, remove control, checkmark).
   * Pass a string, or a function receiving {@link FilenameIconDescriptionContext}.
   * When the resolved value is omitted or blank after trim, defaults are used:
   * - `uploading`: passed to `Loading` as `"uploading"`
   * - `edit`: close button `aria-label` is `"Remove file"`
   * - `complete`: checkmark `aria-label` / `title` are `"Upload complete"`
   * @default undefined
   */
  iconDescription?:
    | string
    | undefined
    | ((ctx: FilenameIconDescriptionContext) => string | undefined);

  /**
   * Current file when rendered inside `FileUploader`; omit when using `FileUploaderItem` only.
   * @default undefined
   */
  file?: File | undefined;

  /**
   * Display file name (e.g. `file.name` or `FileUploaderItem` `name`).
   * @default ""
   */
  fileName?: string;

  /**
   * Set to `true` to indicate an invalid state
   * @default false
   */
  invalid?: boolean;

  [key: `data-${string}`]: unknown;
};

export type FilenameProps = Omit<$RestProps, keyof $Props> & $Props;

export default class Filename extends SvelteComponentTyped<
  FilenameProps,
  { click: WindowEventMap["click"]; keydown: WindowEventMap["keydown"] },
  Record<string, never>
> {}
