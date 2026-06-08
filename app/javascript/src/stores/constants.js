export const CATEGORY_STORE = "category-storage";
export const COLUMN_STORE = "columns-storage";
export const ROW_STORE = "row-storage";

export const ROW_FILTER_INITIAL_VALUES = {
  title: "",
  categories: [],
  status: { label: "Both", value: "both" },
};

export const COLUMN_FILTER_INITIAL_VALUES = {
  title: true,
  category: true,
  status: true,
  lastPublishedAt: true,
};
