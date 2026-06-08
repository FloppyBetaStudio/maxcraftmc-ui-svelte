import { SvelteComponentTyped } from "svelte";

export type RecursiveListItemProps = {
  /**
   * Specify the text to render
   * @default ""
   */
  text?: string;

  /**
   * Specify a link href
   * @default ""
   */
  href?: string;

  /**
   * Specify HTML to render using `@html`
   * @default ""
   */
  html?: string;

  /**
   * Specify the link target.
   * @default undefined
   */
  target?: import("svelte/elements").HTMLAnchorAttributes["target"];

  /**
   * Specify the link rel. When `target` is `"_blank"`,
   * `rel` defaults to `"noopener noreferrer"`.
   * @default undefined
   */
  rel?: import("svelte/elements").HTMLAnchorAttributes["rel"];

  children?: (this: void) => void;
};

export default class RecursiveListItem extends SvelteComponentTyped<
  RecursiveListItemProps,
  Record<string, any>,
  { default: Record<string, never> }
> {}
