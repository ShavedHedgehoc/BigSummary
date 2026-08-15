import { create } from "zustand";
import { FetchCansListFilter } from "../../../shared/api/services/trace-cans-service";
import { CansListFilterParams } from "../cans-list-filter-params";
import { ITracePlant } from "../../../shared/api/services/trace-plants-service";

export interface FetchConveyorFilter {
  value: string;
  valueAsc: boolean;
  onlyEmptyBarcode: boolean;
}

interface CansListFilterStore {
  filter: FetchCansListFilter;
  selectedPlant: number;
  plantSelectorOptions: ITracePlant[] | [];
  clearFilter: () => void;
  changeFilter: (value: FetchBoilsFilterFormField) => void;
  setSelectedPlant: (value: number) => void;
  fillPlantSelectorOptions: (values: ITracePlant[]) => void;
}

const initFilterValue: FetchCansListFilter = {
  value: "",
  valueAsc: true,
  onlyEmptyBarcode: false,
  plants: [],
};

export const useCansListFilterStore = create<CansListFilterStore>()((set) => ({
  filter: initFilterValue,
  selectedPlant: 999999,
  plantSelectorOptions: [],
  clearFilter: () => set(() => ({ filter: initFilterValue })),
  changeFilter: ({ key, value, values }) => {
    switch (key) {
      case CansListFilterParams.VALUE:
        set((state) => ({ filter: { ...state.filter, value: value } }));
        break;
      case CansListFilterParams.VALUE_ASC:
        set((state) => ({ filter: { ...state.filter, valueAsc: value === "true" ? true : false } }));
        break;
      case CansListFilterParams.ONLY_EMPTY_BARCODE:
        set((state) => ({ filter: { ...state.filter, onlyEmptyBarcode: value === "true" ? true : false } }));
        break;
      case CansListFilterParams.PLANTS:
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
    set(() => ({ plantSelectorOptions: [{ PlantPK: 999999, PlantName: "Все", PlantAlias: "" }, ...values] })),
}));
