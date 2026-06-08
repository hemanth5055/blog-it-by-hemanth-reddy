export const FILTER_FIELDS = [
  { name: "title", labelKey: "labels.title", disabled: true },
  { name: "category", labelKey: "labels.category" },
  { name: "lastPublishedAt", labelKey: "labels.lastPublishedAt" },
  { name: "status", labelKey: "labels.status" },
];

export const STATUS_OPTIONS = [
  { label: "Both", value: "both" },
  { label: "Draft", value: "draft" },
  { label: "Published", value: "published" },
];

export const ROW_FILTER_INITIAL_VALUES = {
  title: "",
  categories: [],
  status: { label: "Both", value: "both" },
};
