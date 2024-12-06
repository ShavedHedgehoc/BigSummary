import { create } from "zustand";
import { IPlant } from "../../../types";
import { ForemanFilterParams } from "./foreman-filter-params";

interface ForemanFilterStore {
  filter: FetchProductFilter;
  selectedPlant: number | null;
  plantSelectorOptions: IPlant[] | [];
  stateSelectorOptions: IHistoryType[] | [];
  clearFilter: () => void;
  changeFilter: (value: FetchBoilsFilterFormField) => void;
  setSelectedPlant: (value: number) => void;
  fillPlantSelectorOptions: (values: IPlant[]) => void;
  fillStateSelectorOptions: (values: IHistoryType[]) => void;
}

const initFilterValue: FetchProductFilter = {
  productCode: "",
  boil: "",
  marking: "",
  haveRecord: true,
  boilAsc: false,
  states: [],
  plant: null,
};

export const useForemanFilterStore = create<ForemanFilterStore>()((set) => ({
  filter: initFilterValue,
  selectedPlant: null,
  plantSelectorOptions: [],
  stateSelectorOptions: [],
  clearFilter: () =>
    set((state) => ({
      filter: {
        ...state.filter,
        productCode: initFilterValue.productCode,
        boil: initFilterValue.boil,
        marking: initFilterValue.marking,
        states: initFilterValue.states,
      },
    })),

  changeFilter: ({ key, value, values }) => {
    switch (key) {
      case ForemanFilterParams.BOIL:
        set((state) => ({ filter: { ...state.filter, boil: value } }));
        break;
      case ForemanFilterParams.PLANT:
        set((state) => ({ filter: { ...state.filter, plant: values?.length ? values[0] : state.filter.plant } }));
        break;
      case ForemanFilterParams.PRODUCT:
        set((state) => ({ filter: { ...state.filter, productCode: value } }));
        break;
      case ForemanFilterParams.MARKING:
        set((state) => ({ filter: { ...state.filter, marking: value } }));
        break;
      case ForemanFilterParams.BOIL_ASC:
        set((state) => ({ filter: { ...state.filter, boilAsc: value === "true" ? true : false } }));
        break;
      case ForemanFilterParams.STATES:
        set((state) => ({
          filter: { ...state.filter, states: values ? [...values] : [...state.filter.states] },
        }));
        break;
      default:
        break;
    }
  },
  setSelectedPlant: (value) => set(() => ({ selectedPlant: value })),
  fillPlantSelectorOptions: (values) => set(() => ({ plantSelectorOptions: [...values] })),
  fillStateSelectorOptions: (values) => set(() => ({ stateSelectorOptions: [...values] })),
}));
