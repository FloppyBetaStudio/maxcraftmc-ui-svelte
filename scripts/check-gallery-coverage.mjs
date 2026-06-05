import { readFile } from "node:fs/promises";

const gallery = await readFile(new URL("../examples/component-gallery/src/App.svelte", import.meta.url), "utf8");
const requiredComponents = [
  "Accordion",
  "Breadcrumb",
  "Button",
  "Checkbox",
  "CodeSnippet",
  "ComboBox",
  "ContentSwitcher",
  "ContextMenu",
  "CopyButton",
  "DataTable",
  "DatePicker",
  "Dropdown",
  "FileUploader",
  "HeaderSearch",
  "InlineLoading",
  "InlineNotification",
  "Link",
  "Loading",
  "Modal",
  "MultiSelect",
  "NumberInput",
  "OverflowMenu",
  "Pagination",
  "PaginationNav",
  "PasswordInput",
  "Popover",
  "ProgressBar",
  "ProgressIndicator",
  "RadioButton",
  "RadioTile",
  "Search",
  "Select",
  "SelectableTile",
  "SideNav",
  "SkeletonPlaceholder",
  "SkeletonText",
  "Slider",
  "StructuredList",
  "Switch",
  "Tabs",
  "TextArea",
  "TextInput",
  "Tile",
  "TileGroup",
  "TimePicker",
  "ToastNotification",
  "Toggle",
  "Truncate",
  "TooltipDefinition",
  "TooltipIcon",
  "TreeView",
  "UnorderedList",
];

const missing = requiredComponents.filter((component) => !new RegExp(`<${component}\\b`).test(gallery));

if (missing.length > 0) {
  throw new Error(`Component gallery is missing required visual coverage: ${missing.join(", ")}`);
}

console.log(`Gallery coverage OK (${requiredComponents.length} required components)`);
