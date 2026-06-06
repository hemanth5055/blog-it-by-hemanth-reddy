export const columns = [
  {
    title: "Title",
    dataIndex: "titleAndSlug",
    key: "titleAndSlug",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Updated at",
    dataIndex: "updatedAt",
    key: "updatedAt",
  },
  {
    title: "status",
    dataIndex: "status",
    key: "status",
  },
];

export const FILTER_FIELDS = [
  { name: "title", labelKey: "labels.title", disabled: true },
  { name: "category", labelKey: "labels.category" },
  { name: "lastUpdatedAt", labelKey: "labels.lastUpdatedAt" },
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
