import { create } from "zustand";

import { devtools } from "zustand/middleware";
import { getCurrentDay, getTomorrowDate } from "../../../shared/helpers/date-time-formatters";
import { ITraceBatchWghtReportFilter } from "../../../shared/api/services/trace-batchs-service";
import { TraceBatchWghtReportFilterParams } from "../filter/trace-batch-wght-report-filter-params";

interface FetchTraceBatchsFilterFormField {
  key: string;
  value: string;
  values?: string[];
}

interface TraceBatchsWghtReportFilterStore {
  filter: ITraceBatchWghtReportFilter;
  selectedPlant: string;
  plantSelectorOptions: IPlant[] | [];
  clearFilter: () => void;
  setDayToToday: () => void;
  setDayToTomorrow: () => void;
  changeFilter: (value: FetchTraceBatchsFilterFormField) => void;
  setSelectedPlant: (value: string) => void;
  fillPlantSelectorOptions: (values: IPlant[]) => void;
}

const initFilterValue: ITraceBatchWghtReportFilter = {
  batchDate: getTomorrowDate(),
  batchName: "",
  productId: "",
  compare: true,
  plants: [],
};

export const useTraceBatchWghtReportFilterStore = create<TraceBatchsWghtReportFilterStore>()(
  devtools((set) => ({
    filter: initFilterValue,
    selectedPlant: "#",
    plantSelectorOptions: [],
    clearFilter: () => set(() => ({ filter: initFilterValue, selectedPlant: "#" })),
    setDayToToday: () =>
      set((state) => ({
        filter: { ...state.filter, batchDate: getCurrentDay().toJSON().slice(0, 10) },
      })),
    setDayToTomorrow: () =>
      set((state) => ({
        filter: { ...state.filter, batchDate: getTomorrowDate() },
      })),

    changeFilter: ({ key, value, values }) => {
      switch (key) {
        case TraceBatchWghtReportFilterParams.BATCH_NAME:
          set((state) => ({
            filter: { ...state.filter, batchName: value },
          }));
          break;
        case TraceBatchWghtReportFilterParams.BATCH_DATE:
          set((state) => ({
            filter: { ...state.filter, batchDate: value },
          }));
          break;
        case TraceBatchWghtReportFilterParams.COMPARE:
          set((state) => ({ filter: { ...state.filter, compare: value === "true" ? true : false } }));
          break;

        case TraceBatchWghtReportFilterParams.PRODUCT_ID:
          set((state) => ({
            filter: { ...state.filter, productId: value },
          }));
          break;
        case TraceBatchWghtReportFilterParams.PLANTS:
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
