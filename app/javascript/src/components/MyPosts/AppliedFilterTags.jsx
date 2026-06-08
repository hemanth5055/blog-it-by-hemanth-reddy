import React from "react";

import { Tag, Typography } from "neetoui";
import { useRowFilterStore } from "stores/useRowFilterStore";

const AppliedFilterTags = () => {
  const { selectedFilters } = useRowFilterStore();

  return (
    <div className="flex items-center gap-2">
      {selectedFilters.title && (
        <Typography style="h4" weight="medium">
          "{selectedFilters.title}"
        </Typography>
      )}
      {selectedFilters.categories.map(category => (
        <Tag
          key={category.value}
          label={category.label}
          size="large"
          style="secondary"
        />
      ))}
      {selectedFilters.status.value !== "both" && (
        <Tag
          label={selectedFilters.status.label}
          size="large"
          style={
            selectedFilters.status.value === "draft" ? "warning" : "success"
          }
        />
      )}
    </div>
  );
};

export default AppliedFilterTags;
