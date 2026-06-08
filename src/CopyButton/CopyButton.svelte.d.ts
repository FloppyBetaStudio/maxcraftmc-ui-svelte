import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["button"];

type $Props<Icon = any> = {
  /**
   * Set the feedback text shown after clicking the button
   * @default "Copied!"
   */
  feedback?: string;

  /**
   * Set the timeout duration (ms) to display feedback text
   * @default 2000
   */
  feedbackTimeout?: number;

  /**
   * Specify an icon to render during the feedback window (e.g. after copying).
   * When unset, the copy icon is always shown.
   * @default undefined
   */
  feedbackIcon?: Icon;

  /**
   * Set the title and ARIA label for the copy button
   * @default "Copy to clipboard"
   */
  iconDescription?: string;

  /**
   * Specify the text to copy.
   * @default undefined
   */
  text?: string;

  /**
   * Override the default copy behavior (navigator.clipboard.writeText).
   */
  copy?: (text: string) => void | Promise<void>;

  /**
   * Set to `true` to render the feedback tooltip in a portal,
   * preventing it from being clipped by `overflow: hidden` containers.
   * By default, the tooltip is portalled when inside a `Modal`.
   * @default undefined
   */
  portalTooltip?: boolean | undefined;

  [key: `data-${string}`]: unknown;
};

export type CopyButtonProps<Icon = any> = Omit<$RestProps, keyof $Props<Icon>> &
  $Props<Icon>;

export default class CopyButton<Icon = any> extends SvelteComponentTyped<
  CopyButtonProps<Icon>,
  {
    animationend: WindowEventMap["animationend"];
    blur: WindowEventMap["blur"];
    click: WindowEventMap["click"];
    copy: CustomEvent<null>;
    "copy:error": CustomEvent<any>;
    focus: WindowEventMap["focus"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
  },
  Record<string, never>
> {}
