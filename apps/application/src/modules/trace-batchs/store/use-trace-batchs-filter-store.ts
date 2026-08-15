import { create } from "zustand";

import { devtools } from "zustand/middleware";
import {
  getCurrentDay,
  getFirstDayOfCurrentMonth,
  getLastDayOfCurrentMonth,
  getTomorrowDate,
} from "../../../shared/helpers/date-time-formatters";
import { FetchTraceBatchsFilter } from "../../../shared/api/services/trace-batchs-service";
import { TraceBatchsFilterParams } from "../filter/trace-batchs-filter-params";

interface FetchTraceBatchsFilterFormField {
  key: string;
  value: string;
  values?: string[];
}

interface TraceBatchsFilterStore {
  filter: FetchTraceBatchsFilter;
  selectedPlant: string;
  plantSelectorOptions: IPlant[] | [];
  clearFilter: () => void;
  setDayToToday: () => void;
  setDayToTomorrow: () => void;
  changeFilter: (value: FetchTraceBatchsFilterFormField) => void;
  setSelectedPlant: (value: string) => void;
  fillPlantSelectorOptions: (values: IPlant[]) => void;
}

const initFilterValue: FetchTraceBatchsFilter = {
  startDate: getFirstDayOfCurrentMonth().toJSON().slice(0, 10),
  endDate: getLastDayOfCurrentMonth().toJSON().slice(0, 10),
  batch: "",
  marking: "",
  month: "",
  year: "",
  plants: [],
};

export const useTraceBatchsFilterStore = create<TraceBatchsFilterStore>()(
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
        filter: {
          ...state.filter,
          startDate: getTomorrowDate(),
          endDate: getTomorrowDate(),
        },
      })),

    changeFilter: ({ key, value, values }) => {
      switch (key) {
        case TraceBatchsFilterParams.BATCH:
          set((state) => ({
            filter: { ...state.filter, batch: value },
          }));
          break;
        case TraceBatchsFilterParams.START_DATE:
          set((state) => ({
            filter: { ...state.filter, startDate: value },
          }));
          break;
        case TraceBatchsFilterParams.END_DATE:
          set((state) => ({
            filter: { ...state.filter, endDate: value },
          }));
          break;
        case TraceBatchsFilterParams.MARKING:
          set((state) => ({
            filter: { ...state.filter, marking: value },
          }));
          break;
        case TraceBatchsFilterParams.PLANTS:
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
