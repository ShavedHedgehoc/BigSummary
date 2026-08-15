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
  startDate: getTomorrowDate(),
  endDate: getTomorrowDate(),
  batchName: "",
  productId: "",
  compare: true,
  sortByBatch: false,
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
        filter: {
          ...state.filter,
          startDate: getCurrentDay().toJSON().slice(0, 10),
          endDate: getCurrentDay().toJSON().slice(0, 10),
        },
      })),
    setDayToTomorrow: () =>
      set((state) => ({
        filter: { ...state.filter, startDate: getTomorrowDate(), endDate: getTomorrowDate() },
      })),

    changeFilter: ({ key, value, values }) => {
      switch (key) {
        case TraceBatchWghtReportFilterParams.BATCH_NAME:
          set((state) => ({
            filter: { ...state.filter, batchName: value },
          }));
          break;
        case TraceBatchWghtReportFilterParams.START_BATCH_DATE:
          set((state) => ({
            filter: { ...state.filter, startDate: value },
          }));
          break;
        case TraceBatchWghtReportFilterParams.END_BATCH_DATE:
          set((state) => ({
            filter: { ...state.filter, endDate: value },
          }));
          break;
        case TraceBatchWghtReportFilterParams.COMPARE:
          set((state) => ({ filter: { ...state.filter, compare: value === "true" ? true : false } }));
          break;
        case TraceBatchWghtReportFilterParams.SORT_BY_BATCH:
          set((state) => ({ filter: { ...state.filter, sortByBatch: value === "true" ? true : false } }));
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
