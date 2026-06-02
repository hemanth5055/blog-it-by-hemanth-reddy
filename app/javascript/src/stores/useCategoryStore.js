import { create } from "zustand";
import { persist } from "zustand/middleware";

import { CATEGORY_STORE } from "./constants";

export const useCategoryStore = create(
  persist(
    set => ({
      selectedCategories: [],

      toggleCategorySelection: categoryId =>
        set(state => {
          const exists = state.selectedCategories.includes(categoryId);

          return {
            selectedCategories: exists
              ? state.selectedCategories.filter(id => id !== categoryId)
              : [...state.selectedCategories, categoryId],
          };
        }),
    }),
    {
      name: CATEGORY_STORE,
    }
  )
);
