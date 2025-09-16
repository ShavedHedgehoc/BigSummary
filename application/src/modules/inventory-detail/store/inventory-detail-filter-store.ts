import { create } from "zustand";
import { FetchInventoryRowsFilter } from "../../../shared/api/services/inventory-rows-service";
import { InventoryDetailFilterParams } from "./inventory-detail-filter-params";

export interface InventoryDetailFilterStore {
  filter: FetchInventoryRowsFilter;
  selectedDays: number;
  clearFilter: () => void;
  changeFilter: (value: FetchBoilsFilterFormField) => void;
  setSelectedDays: (value: number) => void;
}

export const expDaysValues = [30, 60, 90];

export const initFilterValue: FetchInventoryRowsFilter = {
  productCode: "",
  dayToExpire: expDaysValues[0],
  toFilter: false,
};

export const useInventoryDetailFilterStore = create<InventoryDetailFilterStore>()((set) => ({
  filter: initFilterValue,
  selectedDays: expDaysValues[0],
  expDaysSelectorOptions: [...expDaysValues],
  clearFilter: () => set(() => ({ filter: initFilterValue, selectedDays: expDaysValues[0] })),

  changeFilter: ({ key, value, values }) => {
    switch (key) {
      case InventoryDetailFilterParams.PRODUCT:
        set((state) => ({ filter: { ...state.filter, productCode: value } }));
        break;
      case InventoryDetailFilterParams.DAY_TO_EXPIRE:
        set((state) => ({
          filter: { ...state.filter, dayToExpire: values?.length ? values[0] : state.filter.dayToExpire },
        }));
        break;

      case InventoryDetailFilterParams.TO_FILTER:
        set((state) => ({ filter: { ...state.filter, toFilter: value === "true" ? true : false } }));
        break;

      default:
        break;
    }
  },
  setSelectedDays: (value) => set(() => ({ selectedDays: value })),
}));
