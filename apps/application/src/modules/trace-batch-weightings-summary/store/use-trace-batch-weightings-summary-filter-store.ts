import { create } from "zustand";

import { devtools } from "zustand/middleware";
import { getCurrentDay } from "../../../shared/helpers/date-time-formatters";
import { FetchTraceWeightingsSummaryFilter } from "../../../shared/api/services/trace-batchs-service";
import { TraceBatchWeightingsSummaryFilterParams } from "../filter/trace-batch-weightings-summary-filter-params";

interface FetchTraceBatchsFilterFormField {
  key: string;
  value: string;
  values?: string[];
}

interface TraceBatchWeightingsSummaryFilterStore {
  filter: FetchTraceWeightingsSummaryFilter;
  selectedPlant: string;
  plantSelectorOptions: IPlant[] | [];
  clearFilter: () => void;
  setDayToToday: () => void;
  changeFilter: (value: FetchTraceBatchsFilterFormField) => void;
  setSelectedPlant: (value: string) => void;
  fillPlantSelectorOptions: (values: IPlant[]) => void;
}

const initFilterValue: FetchTraceWeightingsSummaryFilter = {
  startDate: getCurrentDay().toJSON().slice(0, 10),
  endDate: getCurrentDay().toJSON().slice(0, 10),
  author: "",
  plants: [],
};

export const useTraceBatchWeightingsSummaryFilterStore = create<TraceBatchWeightingsSummaryFilterStore>()(
  devtools((set) => ({
    filter: initFilterValue,
    selectedPlant: "#",
    plantSelectorOptions: [],
    clearFilter: () => set(() => ({ filter: initFilterValue, selectedPlant: "#" })),
    setDayToToday: () =>
      set((state) => ({
        filter: {
          ...state.filter,
          startDate: getCurrentDay().toJSON().slice(0, 10),
          endDate: getCurrentDay().toJSON().slice(0, 10),
        },
      })),
    changeFilter: ({ key, value, values }) => {
      switch (key) {
        case TraceBatchWeightingsSummaryFilterParams.AUTHOR:
          set((state) => ({
            filter: { ...state.filter, author: value },
          }));
          break;
        case TraceBatchWeightingsSummaryFilterParams.START_DATE:
          set((state) => ({
            filter: { ...state.filter, startDate: value },
          }));
          break;
        case TraceBatchWeightingsSummaryFilterParams.END_DATE:
          set((state) => ({
            filter: { ...state.filter, endDate: value },
          }));
          break;
        case TraceBatchWeightingsSummaryFilterParams.PLANTS:
          set((state) => ({
            filter: { ...state.filter, plants: values ? [...values] : [...state.filter.plants] },
          }));
          break;
        default:
          break;
      }
    },
    setSelectedPlant: (value) => set(() => ({ selectedPlant: value })),
    fillPlantSelectorOptions: (values) =>
      set(() => ({ plantSelectorOptions: [{ id: 999999, value: "Все", abb: "#" }, ...values] })),
  }))
);
