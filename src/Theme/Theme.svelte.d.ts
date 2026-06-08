import { SvelteComponentTyped } from "svelte";

export declare const themes: Record<CarbonTheme, string>;

export type CarbonTheme = "white" | "g10" | "g80" | "g90" | "g100";

export type ThemeProps<Tokens = Record<string, any>> = {
  /**
   * Set the current Carbon theme.
   * @default "white"
   */
  theme?: CarbonTheme;

  /**
   * Customize a theme with your own tokens.
   * @see https://carbondesignsystem.com/elements/themes/overview/#customizing-a-theme
   * @default {}
   */
  tokens?: Tokens;

  /**
   * Set to `true` to persist the theme using window.localStorage
   * @default false
   */
  persist?: boolean;

  /**
   * Specify the local storage key
   * @default "theme"
   */
  persistKey?: string;

  /**
   * Render a toggle, select, or dropdown to control the theme.
   * @default undefined
   */
  render?: "toggle" | "select" | "dropdown";

  /**
   * Override the default toggle props.
   * @default { themes: ["white", "g100"], labelA: "", labelB: "", labelText: "Dark mode", hideLabel: false, }
   */
  toggle?: import("../Toggle/Toggle.svelte").ToggleProps & {
    themes?: [labelA: CarbonTheme, labelB: CarbonTheme];
  };

  /**
   * Override the default select props.
   * @default { themes: themeKeys, labelText: "Themes", hideLabel: false, }
   */
  select?: import("../Select/Select.svelte").SelectProps<CarbonTheme> & {
    themes?: CarbonTheme[];
  };

  /**
   * Override the default dropdown props.
   * @default { themes: themeKeys, labelText: "Themes", hideLabel: false, }
   */
  dropdown?: Omit<
    import("../Dropdown/Dropdown.svelte").DropdownProps,
    "items" | "selectedId"
  > & { themes?: CarbonTheme[] };

  children?: (this: void, ...args: [{ theme: CarbonTheme }]) => void;
};

export default class Theme<
  Tokens = Record<string, any>,
> extends SvelteComponentTyped<
  ThemeProps<Tokens>,
  {
    update: CustomEvent<{
      theme: CarbonTheme;
    }>;
  },
  { default: { theme: CarbonTheme } }
> {}
