import React from "react";

import { Typography } from "@bigbinary/neetoui";
import classNames from "classnames";

import { useCategoryStore } from "../../stores/useCategoryStore";

const Item = ({ name, id }) => {
  const { selectedCategories, toggleCategorySelection } = useCategoryStore(
    state => ({
      selectedCategories: state.selectedCategories,
      toggleCategorySelection: state.toggleCategorySelection,
    })
  );

  return (
    <div
      className={classNames(
        "flex w-full cursor-pointer items-center justify-center rounded-md bg-[#262626] p-2",
        {
          "neeto-ui-border-primary-500 border-2":
            selectedCategories.includes(id),
        }
      )}
      onClick={() => toggleCategorySelection(id)}
    >
      <Typography weight="medium">{name}</Typography>
    </div>
  );
};

export default Item;
