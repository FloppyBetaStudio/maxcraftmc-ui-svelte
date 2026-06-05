# Component Catalog

This catalog mirrors the public exports in `src/index.js`. The compatibility
target is `carbon-components-svelte@0.89.4`.

## Inputs And Forms

- `Button`, `ButtonSkeleton`, `ButtonSet`
- `Checkbox`, `CheckboxSkeleton`
- `ComboBox`
- `Dropdown`, `DropdownSkeleton`
- `Form`, `FluidForm`, `FormGroup`, `FormItem`, `FormLabel`
- `MultiSelect`
- `NumberInput`, `NumberInputSkeleton`
- `RadioButton`, `RadioButtonSkeleton`, `RadioButtonGroup`
- `Search`, `SearchSkeleton`
- `Select`, `SelectSkeleton`, `SelectItem`, `SelectItemGroup`
- `Slider`, `SliderSkeleton`
- `TextArea`, `TextAreaSkeleton`
- `TextInput`, `TextInputSkeleton`, `PasswordInput`
- `TimePicker`, `TimePickerSelect`
- `Toggle`, `ToggleSkeleton`

## Layout And Navigation

- `Accordion`, `AccordionItem`, `AccordionSkeleton`
- `AspectRatio`
- `Breadcrumb`, `BreadcrumbItem`, `BreadcrumbSkeleton`
- `ContentSwitcher`, `Switch`
- `Grid`, `Row`, `Column`
- `Header`, `HeaderAction`, `HeaderActionLink`, `HeaderNav`, `HeaderNavItem`, `HeaderNavMenu`
- `HeaderPanelDivider`, `HeaderPanelLink`, `HeaderPanelLinks`
- `HeaderUtilities`, `HeaderGlobalAction`, `HeaderSearch`
- `SideNav`, `SideNavItems`, `SideNavLink`, `SideNavMenu`, `SideNavMenuItem`, `SideNavDivider`
- `Content`, `SkipToContent`
- `Tabs`, `Tab`, `TabContent`, `TabsSkeleton`
- `TreeView`

## Data Display

- `CodeSnippet`, `CodeSnippetSkeleton`
- `DataTable`, `DataTableSkeleton`
- `Table`, `TableBody`, `TableCell`, `TableContainer`, `TableHead`, `TableHeader`, `TableRow`
- `Toolbar`, `ToolbarContent`, `ToolbarSearch`, `ToolbarBatchActions`, `ToolbarMenu`, `ToolbarMenuItem`
- `Link`, `OutboundLink`
- `ListBox`, `ListBoxField`, `ListBoxMenu`, `ListBoxMenuIcon`, `ListBoxMenuItem`, `ListBoxSelection`
- `ListItem`
- `OrderedList`, `UnorderedList`
- `Pagination`, `PaginationSkeleton`, `PaginationNav`
- `StructuredList`, `StructuredListSkeleton`, `StructuredListBody`, `StructuredListHead`
- `StructuredListCell`, `StructuredListRow`, `StructuredListInput`
- `Tag`, `TagSkeleton`
- `Tile`, `ClickableTile`, `ExpandableTile`, `SelectableTile`, `RadioTile`, `TileGroup`
- `Truncate`

## Feedback And Overlays

- `ComposedModal`, `ModalHeader`, `ModalBody`, `ModalFooter`
- `Modal`
- `InlineLoading`
- `Loading`
- `InlineNotification`, `ToastNotification`
- `NotificationActionButton`, `NotificationButton`, `NotificationIcon`
- `Popover`
- `ProgressBar`
- `ProgressIndicator`, `ProgressIndicatorSkeleton`, `ProgressStep`
- `Tooltip`, `TooltipFooter`
- `TooltipDefinition`
- `TooltipIcon`

## Utilities And Helpers

- `Breakpoint`
- `breakpointObserver`
- `breakpoints`
- `ContextMenu`, `ContextMenuDivider`, `ContextMenuGroup`, `ContextMenuOption`, `ContextMenuRadioGroup`
- `CopyButton`
- `DatePicker`, `DatePickerInput`, `DatePickerSkeleton`
- `FileUploader`, `FileUploaderButton`, `FileUploaderItem`, `FileUploaderDropContainer`
- `Filename`, `FileUploaderSkeleton`
- `ImageLoader`
- `LocalStorage`
- `RecursiveList`
- `SkeletonPlaceholder`
- `SkeletonText`
- `Theme`
- `truncate`
- `toHierarchy`

## Styling Status

All components keep the Carbon Svelte 0.89.4 API surface. MaxCraft visual
styling is currently applied through `css/maxcraft.css` as a shared override
layer. Components not explicitly targeted by the override layer still inherit
Carbon-compatible layout and MaxCraft token colors where they use Carbon custom
properties.

For new MaxCraft-specific visual work, prefer adding token-backed CSS overrides
instead of changing component props.
