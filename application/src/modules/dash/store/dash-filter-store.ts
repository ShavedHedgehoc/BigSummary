import { create } from "zustand";
import { IPlant } from "../../../types";
import { DashFilterParams } from "../dash-filter-params";

interface DashFilterStore {
  filter: FetchProductFilter;
  selectedPlant: number | null;
  plantSelectorOptions: IPlant[] | [];
  smallCardView: boolean;

  clearFilter: () => void;
  changeFilter: (value: FetchBoilsFilterFormField) => void;
  setSelectedPlant: (value: number) => void;
  fillPlantSelectorOptions: (values: IPlant[]) => void;
  setSmallCardView: (value: boolean) => void;
}

const initFilterValue: FetchProductFilter = {
  productCode: "",
  conveyor: "",
  boil: "",
  marking: "",
  haveRecord: true,
  boilAsc: false,
  states: [],
  plant: 2,
};

export const useDashFilterStore = create<DashFilterStore>()((set) => ({
  filter: initFilterValue,
  selectedPlant: null,
  plantSelectorOptions: [],
  smallCardView: false,

  clearFilter: () =>
    set((state) => ({
      filter: {
        ...state.filter,
      },
    })),

  changeFilter: ({ key, values }) => {
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
  setSmallCardView: (value) => set(() => ({ smallCardView: value })),
}));
