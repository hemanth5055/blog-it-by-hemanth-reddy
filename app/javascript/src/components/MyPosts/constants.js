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

export const BULK_STATUS_OPTIONS = [
  { label: "draft", value: "draft" },
  { value: "published", label: "publish" },
];
