import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ROW_FILTER_INITIAL_VALUES, ROW_STORE } from "./constants";

export const useRowFilterStore = create(
  persist(
    set => ({
      selectedFilters: ROW_FILTER_INITIAL_VALUES,

      updateSelectedFilters: updatedData => {
        set(state => ({
          selectedFilters: { ...state.selectedFilters, ...updatedData },
        }));
      },
    }),
    {
      name: ROW_STORE,
    }
  )
);
