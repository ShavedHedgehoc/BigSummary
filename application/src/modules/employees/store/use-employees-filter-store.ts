import { create } from "zustand";

import { devtools } from "zustand/middleware";
import { EmployeesFilterParams } from "../employees-filter-params";

interface EmployeesFilterStore {
  filter: FetchEmployeesFilter;
  selectedOccupation: number;
  occupationSelectorOptions: IOccupation[] | [];
  clearFilter: () => void;
  changeFilter: (value: FetchBoilsFilterFormField) => void;
  setSelectedOccupation: (value: number) => void;
  fillOccupationSelectorOptions: (values: IOccupation[]) => void;
}

const initFilterValue: FetchEmployeesFilter = {
  name: "",
  nameAsc: true,
  occupations: [],
};

export const useEmployeesFilterStore = create<EmployeesFilterStore>()(
  devtools((set) => ({
    filter: initFilterValue,
    selectedOccupation: 999999,
    occupationSelectorOptions: [],

    clearFilter: () => set(() => ({ filter: initFilterValue, selectedOccupation: 999999 })),

    changeFilter: ({ key, value, values }) => {
      switch (key) {
        case EmployeesFilterParams.NAME:
          set((state) => ({ filter: { ...state.filter, name: value } }));
          break;

        case EmployeesFilterParams.NAME_ASC:
          set((state) => ({ filter: { ...state.filter, nameAsc: value === "true" ? true : false } }));
          break;
        case EmployeesFilterParams.OCCUPATIONS:
          set((state) => ({
            filter: { ...state.filter, occupations: values ? [...values] : [...state.filter.occupations] },
          }));
          break;
        default:
          break;
      }
    },
    setSelectedOccupation: (value) => set(() => ({ selectedOccupation: value })),
    fillOccupationSelectorOptions: (values) =>
      set(() => ({ occupationSelectorOptions: [{ id: 999999, value: "Все", description: "Все" }, ...values] })),
  }))
);
