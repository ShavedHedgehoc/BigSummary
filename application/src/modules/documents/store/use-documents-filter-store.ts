import { create } from "zustand";
// import { BoilsFilterParams } from "../boils-filter-params";
import { IPlant } from "../../../types";
import { devtools } from "zustand/middleware";
import { DocumentsFilterParams } from "../documents-filter-params";
import {
  getCurrentDay,
  getFirstDayOfCurrentMonth,
  getLastDayOfCurrentMonth,
} from "../../../shared/helpers/date-time-formatters";

interface DocumentsFilterStore {
  filter: FetchDocumentsFilter;
  selectedPlant: number;
  plantSelectorOptions: IPlant[] | [];
  clearFilter: () => void;
  setDayToToday: () => void;
  changeFilter: (value: FetchDocumentsFilterFormField) => void;
  setSelectedPlant: (value: number) => void;
  fillPlantSelectorOptions: (values: IPlant[]) => void;
}

const initFilterValue: FetchDocumentsFilter = {
  startDate: getFirstDayOfCurrentMonth().toJSON().slice(0, 10),
  endDate: getLastDayOfCurrentMonth().toJSON().slice(0, 10),
  plants: [],
};

export const useDocumentsFilterStore = create<DocumentsFilterStore>()(
  devtools((set) => ({
    filter: initFilterValue,
    selectedPlant: 999999,
    plantSelectorOptions: [],
    clearFilter: () => set(() => ({ filter: initFilterValue, selectedPlant: 999999 })),
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
        case DocumentsFilterParams.START_DATE:
          set((state) => ({
            filter: { ...state.filter, startDate: value },
          }));
          break;
        case DocumentsFilterParams.END_DATE:
          set((state) => ({
            filter: { ...state.filter, endDate: value },
          }));
          break;
        case DocumentsFilterParams.PLANTS:
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
      set(() => ({ plantSelectorOptions: [{ id: 999999, value: "Все", abb: "" }, ...values] })),
  }))
);
