import { create } from "zustand";
import { persist } from "zustand/middleware";

import { COLUMN_STORE } from "./constants";

export const useColumnFilterStore = create(
  persist(
    set => ({
      selectedFilters: {
        title: true,
        category: true,
        lastUpdatedAt: true,
        status: true,
      },

      updateSelectedFilters: updatedData => {
        set(state => ({
          selectedFilters: { ...state.selectedFilters, ...updatedData },
        }));
      },
    }),
    {
      name: COLUMN_STORE,
    }
  )
);
