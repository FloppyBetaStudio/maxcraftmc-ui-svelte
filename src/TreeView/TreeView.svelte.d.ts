import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

export type TreeNode<Id = string | number> = {
  id: Id;
  text: any;
  icon?: any;
  /** Whether the node is disabled */
  disabled?: boolean;
  /** Optional URL the node links to */
  href?: string;
  /** Optional link target (e.g., "_blank") */
  target?: string;
  nodes?: TreeNode<Id>[];
};

export type ShowNodeOptions = {
  /** Whether to expand the node and its ancestors (default: true) */
  expand?: boolean;
  /** Whether to select the node (default: true) */
  select?: boolean;
  /** Whether to focus the node (default: true) */
  focus?: boolean;
};

export type CarbonTreeViewContext<Node extends TreeNode<any> = TreeNode<any>> =
  {
    activeNodeId: import("svelte/store").Writable<Node["id"]>;
    selectedNodeIds: import("svelte/store").Writable<ReadonlyArray<Node["id"]>>;
    expandedNodeIds: import("svelte/store").Writable<ReadonlyArray<Node["id"]>>;
    selectedIdsSetStore: import("svelte/store").Writable<Set<Node["id"]>>;
    expandedIdsSetStore: import("svelte/store").Writable<Set<Node["id"]>>;
    multiselectStore: import("svelte/store").Writable<boolean>;
    clickNode: (node: Node, event?: Event) => void;
    selectNode: (node: Node) => void;
    expandNode: (node: Node, expanded: boolean) => void;
    focusNode: (node: Node) => void;
    toggleNode: (node: Node) => void;
  };

type $RestProps = SvelteHTMLElements["ul"];

type $Props<Node extends TreeNode<any> = TreeNode<any>> = {
  /**
   * Provide an array of nodes to render.
   * @default []
   */
  nodes?: ReadonlyArray<Node>;

  /**
   * Set the current active node id.
   * Only one node can be active.
   * @default ""
   */
  activeId?: Node["id"];

  /**
   * Set the node ids to be selected.
   * @default []
   */
  selectedIds?: ReadonlyArray<Node["id"]>;

  /**
   * Set the node ids to be expanded.
   * @default []
   */
  expandedIds?: ReadonlyArray<Node["id"]>;

  /**
   * Specify the TreeView size.
   * @default "default"
   */
  size?: "default" | "compact";

  /**
   * Specify the label text
   * @default ""
   */
  labelText?: string;

  /**
   * Set to `true` to visually hide the label text
   * @default false
   */
  hideLabel?: boolean;

  /**
   * Set to `true` to automatically collapse sibling nodes when expanding a node.
   * When enabled, only one node at each level can be expanded at a time.
   * @default false
   */
  autoCollapse?: boolean;

  /**
   * Set to `true` to enable multi-select mode.
   * Supports Ctrl/Cmd+Click (toggle) and Shift+Click (range select).
   * @default false
   */
  multiselect?: boolean;

  /**
   * When `multiselect` is true, `multiselectMode` controls how many nodes a selection gesture includes:
   * - `'node'`: only the clicked/active node (default)
   * - `'shallow'`: the node plus its direct non-disabled children
   * - `'deep'`: the node plus all non-disabled descendants
   * @default "node"
   */
  multiselectMode?: "node" | "shallow" | "deep";

  labelChildren?: (this: void) => void;

  children?: (
    this: void,
    ...args: [
      { node: Node & { expanded: boolean; leaf: boolean; selected: boolean } },
    ]
  ) => void;

  [key: `data-${string}`]: unknown;
};

export type TreeViewProps<Node extends TreeNode<any> = TreeNode<any>> = Omit<
  $RestProps,
  keyof $Props<Node>
> &
  $Props<Node>;

export default class TreeView<
  Node extends TreeNode<any> = TreeNode<any>,
> extends SvelteComponentTyped<
  TreeViewProps<Node>,
  {
    focus: CustomEvent<
      Node & { expanded: boolean; leaf: boolean; selected: boolean }
    >;
    keydown: WindowEventMap["keydown"];
    select: CustomEvent<
      Node & { expanded: boolean; leaf: boolean; selected: boolean }
    >;
    toggle: CustomEvent<
      Node & { expanded: boolean; leaf: boolean; selected: boolean }
    >;
  },
  {
    default: {
      node: Node & { expanded: boolean; leaf: boolean; selected: boolean };
    };
    labelChildren: Record<string, never>;
  }
> {
  /**
   * Programmatically expand all nodes
   * @example
   * ```svelte
   * <TreeView bind:this={treeView} {nodes} />
   * <button on:click={() => treeView.expandAll()}>Expand All</button>
   * ```
   */
  expandAll: () => void;

  /**
   * Programmatically collapse all nodes
   * @example
   * ```svelte
   * <TreeView bind:this={treeView} {nodes} />
   * <button on:click={() => treeView.collapseAll()}>Collapse All</button>
   * ```
   */
  collapseAll: () => void;

  /**
   * Programmatically expand a subset of nodes.
   * Expands all nodes if no argument is provided.
   * Filter function should return `true` for nodes to expand. If not provided, expands all nodes.
   * @example
   * ```svelte
   * <TreeView bind:this={treeView} {nodes} />
   * <button on:click={() => treeView.expandNodes((node) => node.id.startsWith('folder-'))}>
   *   Expand Folders
   * </button>
   * ```
   */
  expandNodes: (filterNode?: (node: Node) => boolean) => void;

  /**
   * Programmatically collapse a subset of nodes.
   * Collapses all nodes if no argument is provided.
   * Filter function should return `true` for nodes to collapse. If not provided, collapses all nodes.
   * @example
   * ```svelte
   * <TreeView bind:this={treeView} {nodes} />
   * <button on:click={() => treeView.collapseNodes((node) => node.id.startsWith('folder-'))}>
   *   Collapse Folders
   * </button>
   * ```
   */
  collapseNodes: (filterNode?: (node: Node) => boolean) => void;

  /**
   * Programmatically show a node by `id`.
   * By default, the matching node will be expanded, selected, and focused.
   * Use the options parameter to customize this behavior.
   * @example
   * ```svelte
   * <TreeView bind:this={treeView} {nodes} />
   * <button on:click={() => treeView.showNode('node-123')}>
   *   Show Node
   * </button>
   * <button on:click={() => treeView.showNode('node-123', { expand: false, focus: false })}>
   *   Show Node (No Expand/Focus)
   * </button>
   * ```
   */
  showNode: (id: Node["id"], options?: ShowNodeOptions) => void;
}
