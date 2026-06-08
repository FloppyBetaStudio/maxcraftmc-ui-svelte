import { SvelteComponentTyped } from "svelte";

/**
 * Computes the depth of a tree leaf node relative to <ul role="tree" />.
 * Returns the depth of the node (0-based, where 0 is the root level).
 * @example
 * ```svelte
 * import { computeTreeLeafDepth } from 'carbon-components-svelte/TreeView/TreeViewNode.svelte';
 * let nodeElement;
 * $: depth = computeTreeLeafDepth(nodeElement);
 *
 * <li bind:this={nodeElement}>Node at depth {depth}</li>
 * ```
 */
export declare function computeTreeLeafDepth(
  node: HTMLLIElement | null,
): number;

/**
 * Finds the nearest parent tree node
 */
export declare function findParentTreeNode(
  node: HTMLElement | null,
): null | HTMLElement;

export type TreeNode<Id = string | number> =
  import("./TreeView.svelte").TreeNode<Id>;

export type TreeViewNodeProps<
  Node extends TreeNode<any> = TreeNode<any>,
  Icon = any,
> = {
  /**
   * @generics Node,Icon
   * @default false
   */
  leaf?: boolean;

  /**
   * @default ""
   */
  id?: Node["id"];

  /**
   * @default ""
   */
  text?: string;

  /**
   * @default false
   */
  disabled?: boolean;

  /**
   * Specify the URL the TreeNode links to.
   * @default undefined
   */
  href?: string | undefined;

  /**
   * Specify the link target.
   * @default undefined
   */
  target?: string | undefined;

  /**
   * Specify the icon to render.
   * @default undefined
   */
  icon?: Icon;

  children?: (
    this: void,
    ...args: [
      { node: Node & { expanded: false; leaf: boolean; selected: boolean } },
    ]
  ) => void;
};

export default class TreeViewNode<
  Node extends TreeNode<any> = TreeNode<any>,
  Icon = any,
> extends SvelteComponentTyped<
  TreeViewNodeProps<Node, Icon>,
  Record<string, any>,
  {
    default: {
      node: Node & { expanded: false; leaf: boolean; selected: boolean };
    };
  }
> {}
