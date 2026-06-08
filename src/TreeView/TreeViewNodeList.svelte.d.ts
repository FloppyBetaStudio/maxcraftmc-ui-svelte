import { SvelteComponentTyped } from "svelte";

export interface TreeNode<Id> {
  id: Id;
  text: string;
  disabled?: boolean;
  expanded?: boolean;
}

export type TreeViewNodeListProps<
  Id extends string | number = string | number,
  Icon = any,
> = {
  /**
   * @default []
   */
  nodes?: ReadonlyArray<TreeNode<Id> & { nodes?: TreeNode<Id>[] }>;

  /**
   * @default false
   */
  root?: boolean;

  /**
   * @default ""
   */
  id?: Id;

  /**
   * @default ""
   */
  text?: string;

  /**
   * @default false
   */
  disabled?: boolean;

  /**
   * Specify the icon to render.
   * @default undefined
   */
  icon?: Icon;

  children?: (
    this: void,
    ...args: [
      {
        node: TreeNode<Id> & {
          expanded: boolean;
          leaf: boolean;
          selected: boolean;
        };
      },
    ]
  ) => void;
};

export default class TreeViewNodeList<
  Id extends string | number = string | number,
  Icon = any,
> extends SvelteComponentTyped<
  TreeViewNodeListProps<Id, Icon>,
  Record<string, any>,
  {
    default: {
      node: TreeNode<Id> & {
        expanded: boolean;
        leaf: boolean;
        selected: boolean;
      };
    };
  }
> {}
