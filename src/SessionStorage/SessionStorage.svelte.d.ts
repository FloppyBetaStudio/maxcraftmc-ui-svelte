import { SvelteComponentTyped } from "svelte";

export type SessionStorageProps<T = any> = {
  /**
   * Specify the session storage key.
   * @default "session-storage-key"
   */
  key?: string;

  /**
   * Provide a value to persist.
   * @default ""
   */
  value?: T;
};

export default class SessionStorage<T = any> extends SvelteComponentTyped<
  SessionStorageProps<T>,
  {
    /** Fires when a write to sessionStorage fails (e.g. quota exceeded or access denied). */
    error: CustomEvent<{ error: unknown }>;
    save: CustomEvent<null>;
    /** Fires when the stored value changes, either from a bound value update or when sessionStorage is modified from another tab/window. */
    update: CustomEvent<{
      prevValue: T;
      value: T;
    }>;
  },
  Record<string, never>
> {
  /**
   * Remove the persisted key value from the browser's session storage.
   * Note: this only clears storage; the bound `value` is left untouched.
   * If `value` mutates afterwards, it will be re-persisted. Reset `value`
   * yourself if you want it cleared as well.
   * @example
   * ```svelte
   * <SessionStorage bind:this={storage} key="my-key" bind:value={data} />
   * <button on:click={() => { storage.clearItem(); data = ""; }}>Clear Item</button>
   * ```
   */
  clearItem: () => void;

  /**
   * Clear all key values from the browser's session storage.
   * Note: this only clears storage; the bound `value` is left untouched.
   * If `value` mutates afterwards, it will be re-persisted. Reset `value`
   * yourself if you want it cleared as well.
   * @example
   * ```svelte
   * <SessionStorage bind:this={storage} key="my-key" bind:value={data} />
   * <button on:click={() => { storage.clearAll(); data = ""; }}>Clear All Storage</button>
   * ```
   */
  clearAll: () => void;
}
