import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export type RecursiveListNode = {
  /** Unique node identifier; used as the each-block key when provided */
  id?: string | number;
  /** Node text content */
  text?: string;
  /** Node link URL */
  href?: string;
  /** Node HTML content */
  html?: string;
  /** Node link target */
  target?: import("svelte/elements").SvelteHTMLElements["a"]["target"];
  /** Node link rel */
  rel?: import("svelte/elements").SvelteHTMLElements["a"]["rel"];
  /** Child nodes */
  nodes?: RecursiveListNode[];
};

type $RestProps = SvelteHTMLElements["ul"] & SvelteHTMLElements["ol"];

type $Props<Node extends RecursiveListNode = RecursiveListNode> = {
  /**
   * Specify the nodes to render.
   * @default []
   */
  nodes?: ReadonlyArray<Node & { nodes?: Node[] }>;

  /**
   * Specify the type of list to render.
   * @default "unordered"
   */
  type?: "unordered" | "ordered" | "ordered-native";

  /**
   * Set to `true` to use Carbon's expressive typesetting
   * @default false
   */
  expressive?: boolean;

  [key: `data-${string}`]: unknown;
};

export type RecursiveListProps<
  Node extends RecursiveListNode = RecursiveListNode,
> = Omit<$RestProps, keyof $Props<Node>> & $Props<Node>;

export default class RecursiveList<
  Node extends RecursiveListNode = RecursiveListNode,
> extends SvelteComponentTyped<
  RecursiveListProps<Node>,
  Record<string, any>,
  Record<string, never>
> {}
