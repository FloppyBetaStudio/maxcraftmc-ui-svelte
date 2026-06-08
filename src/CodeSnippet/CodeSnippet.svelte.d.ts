import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

/** Rest props are spread to the span (inline variant) or the copy button (single/multi). */
type $RestProps = SvelteHTMLElements["button"] & SvelteHTMLElements["span"];

type $Props<Icon = any> = {
  /**
   * Set the type of code snippet.
   * @default "single"
   */
  type?: "single" | "inline" | "multi";

  /**
   * Set the code snippet text.
   * Alternatively, use the default slot.
   *
   * NOTE: you *must* use the `code` prop for the copy-to-clipboard functionality.
   * @example
   * ```svelte
   * <CodeSnippet>{code}</CodeSnippet>
   * ```
   * @default undefined
   */
  code?: string;

  /**
   * By default, this component uses `navigator.clipboard.writeText` API to copy text to the user's clipboard.
   *
   * Provide a custom function to override this behavior.
   */
  copy?: (code: string) => void | Promise<void>;

  /**
   * Set to `true` to expand a multi-line code snippet (type="multi").
   * @default false
   */
  expanded?: boolean;

  /**
   * Set to `true` to hide the copy button
   * @default false
   */
  hideCopyButton?: boolean;

  /**
   * Set to `true` for the disabled variant.
   * Only applies to the "single", "multi" types.
   * @default false
   */
  disabled?: boolean;

  /**
   * Set to `true` to wrap the text.
   *
   * NOTE: this prop only works with the `type="multi"` variant.
   * @default false
   */
  wrapText?: boolean;

  /**
   * Set to `true` to enable the light variant
   * @default false
   */
  light?: boolean;

  /**
   * Set to `true` to display the skeleton state
   * @default false
   */
  skeleton?: boolean;

  /**
   * Specify the ARIA label for the copy button icon.
   * @default undefined
   */
  copyButtonDescription?: string;

  /**
   * Specify the ARIA label of the copy button.
   * @default "Copy code"
   */
  copyLabel?: string;

  /**
   * Specify the feedback text displayed when clicking the snippet
   * @default "Copied!"
   */
  feedback?: string;

  /**
   * Set the timeout duration (ms) to display feedback text
   * @default 2000
   */
  feedbackTimeout?: number;

  /**
   * Specify an icon to render on the copy button during the feedback window
   * (e.g. after copying). When unset, the copy icon is always shown.
   *
   * NOTE: this prop does not apply to the `type="inline"` variant.
   * @default undefined
   */
  feedbackIcon?: Icon;

  /**
   * Specify the show less text.
   *
   * NOTE: this prop only works with the `type="multi"` variant.
   * @default "Show less"
   */
  showLessText?: string;

  /**
   * Specify the show more text.
   *
   * NOTE: this prop only works with the `type="multi"` variant.
   * @default "Show more"
   */
  showMoreText?: string;

  /**
   * Set to `false` to hide the show more/less button.
   *
   * NOTE: this prop only works with the `type="multi"` variant.
   * @default true
   */
  showMoreLess?: boolean;

  /**
   * Set an id for the code element
   * @default `ccs-${Math.random().toString(36)}`
   */
  id?: string;

  /**
   * Obtain a reference to the pre HTML element.
   * @default null
   */
  ref?: null | HTMLPreElement;

  /**
   * Set to `true` to render the feedback tooltip in a portal,
   * preventing it from being clipped by `overflow: hidden` containers.
   * By default, the tooltip is portalled when inside a `Modal`.
   * @default undefined
   */
  portalTooltip?: boolean | undefined;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type CodeSnippetProps<Icon = any> = Omit<
  $RestProps,
  keyof $Props<Icon>
> &
  $Props<Icon>;

export default class CodeSnippet<Icon = any> extends SvelteComponentTyped<
  CodeSnippetProps<Icon>,
  {
    animationend: WindowEventMap["animationend"];
    click: WindowEventMap["click"];
    collapse: CustomEvent<null>;
    copy: CustomEvent<null>;
    "copy:error": CustomEvent<{ error: unknown }>;
    expand: CustomEvent<null>;
    mouseenter: WindowEventMap["mouseenter"];
    "mouseenter:copy-button": CustomEvent<MouseEvent>;
    mouseleave: WindowEventMap["mouseleave"];
    "mouseleave:copy-button": CustomEvent<MouseEvent>;
    mouseover: WindowEventMap["mouseover"];
  },
  { default: Record<string, never> }
> {}
