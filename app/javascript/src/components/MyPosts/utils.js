export const sanitizeFilters = filters => ({
  ...(filters.title && { title: filters.title }),
  ...(filters.categories?.length && {
    category_ids: filters.categories.map(c => c.value),
  }),
  ...(filters.status?.value &&
    filters.status.value !== "both" && { status: filters.status.value }),
});
