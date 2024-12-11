import { create } from "zustand";
import { IPlant } from "../../../types";
import { DashFilterParams } from "./dash-filter-params";

interface DashFilterStore {
  filter: FetchProductFilter;
  selectedPlant: number | null;
  plantSelectorOptions: IPlant[] | [];

  clearFilter: () => void;
  changeFilter: (value: FetchBoilsFilterFormField) => void;
  setSelectedPlant: (value: number) => void;
  fillPlantSelectorOptions: (values: IPlant[]) => void;
}

const initFilterValue: FetchProductFilter = {
  productCode: "",
  boil: "",
  marking: "",
  haveRecord: true,
  boilAsc: false,
  states: [],
  //   plant: null,
  plant: 2,
};

export const useDashFilterStore = create<DashFilterStore>()((set) => ({
  filter: initFilterValue,
  selectedPlant: null,
  plantSelectorOptions: [],
  //   stateSelectorOptions: [],
  clearFilter: () =>
    set((state) => ({
      filter: {
        ...state.filter,
        // productCode: initFilterValue.productCode,
        // boil: initFilterValue.boil,
        // marking: initFilterValue.marking,
        // states: initFilterValue.states,
      },
    })),

  changeFilter: ({ key, value, values }) => {
    switch (key) {
      case DashFilterParams.PLANT:
        set((state) => ({ filter: { ...state.filter, plant: values?.length ? values[0] : state.filter.plant } }));
        break;

      default:
        break;
    }
  },
  setSelectedPlant: (value) => set(() => ({ selectedPlant: value })),
  fillPlantSelectorOptions: (values) => set(() => ({ plantSelectorOptions: [...values] })),
}));
