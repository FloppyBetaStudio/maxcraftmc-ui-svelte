import { readdir, readFile } from "node:fs/promises";

const gallerySourceDir = new URL("../examples/component-gallery/src/", import.meta.url);
const galleryFiles = await readdir(gallerySourceDir);
const gallerySvelteFiles = galleryFiles.filter((file) => file.endsWith(".svelte"));
const gallery = (
  await Promise.all(gallerySvelteFiles.map((file) => readFile(new URL(file, gallerySourceDir), "utf8")))
).join("\n");
const requiredComponents = [
  "Accordion",
  "Breadcrumb",
  "Button",
  "Checkbox",
  "CheckboxGroup",
  "CodeSnippet",
  "ComboBox",
  "ContainedList",
  "ContainedListItem",
  "ContentSwitcher",
  "ContextMenu",
  "CopyButton",
  "DataTable",
  "DatePicker",
  "Dropdown",
  "FileUploader",
  "FloatingPortal",
  "HeaderAction",
  "HeaderActionLink",
  "HeaderNavMenu",
  "HeaderPanelLink",
  "HeaderPanelLinks",
  "HeaderSearch",
  "Heading",
  "InlineLoading",
  "InlineNotification",
  "Link",
  "Loading",
  "Modal",
  "MultiSelect",
  "NotificationQueue",
  "NumberInput",
  "OverflowMenu",
  "Pagination",
  "PaginationNav",
  "PasswordInput",
  "Popover",
  "Portal",
  "ProgressBar",
  "ProgressIndicator",
  "RadioButton",
  "RadioTile",
  "RangeSlider",
  "Search",
  "Section",
  "Select",
  "SelectableTag",
  "SelectableTile",
  "SelectableTileGroup",
  "SideNav",
  "SkeletonIcon",
  "SkeletonPlaceholder",
  "SkeletonText",
  "Slider",
  "Stack",
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
