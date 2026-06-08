import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["svg"];

type $Props = {
  /**
   * @default 16
   */
  size?: number;

  /**
   * @default undefined
   */
  title?: undefined;

  [key: `data-${string}`]: unknown;
};

export type CheckmarkProps = Omit<$RestProps, keyof $Props> & $Props;

export default class Checkmark extends SvelteComponentTyped<
  CheckmarkProps,
  Record<string, any>,
  Record<string, never>
> {}
