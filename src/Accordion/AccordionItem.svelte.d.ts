import { SvelteComponentTyped } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

type $RestProps = SvelteHTMLElements["li"];

type $Props = {
  /**
   * Specify the title of the accordion item heading.
   * Alternatively, use the "title" slot.
   * @example
   * ```svelte
   * <AccordionItem>
   *   <div slot="title">Custom Title</div>
   * </AccordionItem>
   * ```
   * @default "title"
   */
  title?: string;

  /**
   * Set to `true` to open the first accordion item.
   * @default false
   */
  open?: boolean;

  /**
   * Set to `true` to disable the accordion item.
   * @default false
   */
  disabled?: boolean;

  /**
   * Specify the ARIA label for the accordion item chevron icon
   * @default "Expand/Collapse"
   */
  iconDescription?: string;

  /**
   * Obtain a reference to the heading button HTML element.
   * @default null
   */
  ref?: null | HTMLButtonElement;

  children?: (this: void) => void;

  [key: `data-${string}`]: unknown;
};

export type AccordionItemProps = Omit<$RestProps, keyof $Props> & $Props;

export default class AccordionItem extends SvelteComponentTyped<
  AccordionItemProps,
  {
    animationend: WindowEventMap["animationend"];
    click: WindowEventMap["click"];
    keydown: WindowEventMap["keydown"];
    mouseenter: WindowEventMap["mouseenter"];
    mouseleave: WindowEventMap["mouseleave"];
    mouseover: WindowEventMap["mouseover"];
  },
  { default: Record<string, never>; title: Record<string, never> }
> {}
