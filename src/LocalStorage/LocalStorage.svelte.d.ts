import { SvelteComponentTyped } from "svelte";

export type LocalStorageProps<T = any> = {
  /**
   * Specify the local storage key.
   * @default "local-storage-key"
   */
  key?: string;

  /**
   * Provide a value to persist.
   * @default ""
   */
  value?: T;
};

export default class LocalStorage<T = any> extends SvelteComponentTyped<
  LocalStorageProps<T>,
  {
    /** Fires when a write to localStorage fails (e.g. quota exceeded or access denied). */
    error: CustomEvent<{ error: unknown }>;
    save: CustomEvent<null>;
    /** Fires when the stored value changes, either from a bound value update or when localStorage is modified from another tab/window. */
    update: CustomEvent<{
      prevValue: T;
      value: T;
    }>;
  },
  Record<string, never>
> {
  /**
   * Remove the persisted key value from the browser's local storage.
   * Note: this only clears storage; the bound `value` is left untouched.
   * If `value` mutates afterwards, it will be re-persisted. Reset `value`
   * yourself if you want it cleared as well.
   * @example
   * ```svelte
   * <LocalStorage bind:this={storage} key="my-key" bind:value={data} />
   * <button on:click={() => { storage.clearItem(); data = ""; }}>Clear Item</button>
   * ```
   */
  clearItem: () => void;

  /**
   * Clear all key values from the browser's local storage.
   * Note: this only clears storage; the bound `value` is left untouched.
   * If `value` mutates afterwards, it will be re-persisted. Reset `value`
   * yourself if you want it cleared as well.
   * @example
   * ```svelte
   * <LocalStorage bind:this={storage} key="my-key" bind:value={data} />
   * <button on:click={() => { storage.clearAll(); data = ""; }}>Clear All Storage</button>
   * ```
   */
  clearAll: () => void;
}
