import { create } from "zustand";
import { ConveyorsFilterParams } from "../conveyors-filter-params";

export interface FetchConveyorFilter {
  value: string;
  valueAsc: boolean;
  onlyEmptyBarcode: boolean;
}

interface ConveyorsFilterStore {
  filter: FetchConveyorFilter;
  clearFilter: () => void;
  changeFilter: (value: FetchBoilsFilterFormField) => void;
}

const initFilterValue: FetchConveyorFilter = {
  value: "",
  valueAsc: true,
  onlyEmptyBarcode: false,
};

export const useConveyorsFilterStore = create<ConveyorsFilterStore>()((set) => ({
  filter: initFilterValue,
  clearFilter: () => set(() => ({ filter: initFilterValue })),
  changeFilter: ({ key, value }) => {
    switch (key) {
      case ConveyorsFilterParams.VALUE:
        set((state) => ({ filter: { ...state.filter, value: value } }));
        break;
      case ConveyorsFilterParams.VALUE_ASC:
        set((state) => ({ filter: { ...state.filter, valueAsc: value === "true" ? true : false } }));
        break;
      case ConveyorsFilterParams.ONLY_EMPTY_BARCODE:
        set((state) => ({ filter: { ...state.filter, onlyEmptyBarcode: value === "true" ? true : false } }));
        break;
      default:
        break;
    }
  },
}));
