import { create } from "zustand";
import { BoilsFilterParams } from "../boils-filter-params";
import { IPlant } from "../../../types";
import { devtools } from "zustand/middleware";

interface BoilsFilterStore {
  filter: FetchBoilsFilter;
  selectedPlant: number;
  plantSelectorOptions: IPlant[] | [];
  stateSelectorOptions: IHistoryType[] | [];
  clearFilter: () => void;
  changeFilter: (value: FetchBoilsFilterFormField) => void;
  setSelectedPlant: (value: number) => void;
  fillPlantSelectorOptions: (values: IPlant[]) => void;
  fillStateSelectorOptions: (values: IHistoryType[]) => void;
  //   disableBoilClearFilterButton: { derived: boolean };
}

const initFilterValue: FetchBoilsFilter = {
  baseCode: "",
  boil: "",
  marking: "",
  haveRecord: true,
  boilAsc: false,
  states: [],
  plants: [],
};

export const useBoilsFilterStore = create<BoilsFilterStore>()(
  devtools((set, get) => ({
    filter: initFilterValue,
    selectedPlant: 999999,
    plantSelectorOptions: [],
    stateSelectorOptions: [],
    clearFilter: () => set(() => ({ filter: initFilterValue, selectedPlant: 999999 })),

    changeFilter: ({ key, value, values }) => {
      switch (key) {
        case BoilsFilterParams.BOIL:
          set((state) => ({ filter: { ...state.filter, boil: value } }));
          break;
        case BoilsFilterParams.PLANTS:
          set((state) => ({
            filter: { ...state.filter, plants: values ? [...values] : [...state.filter.plants] },
          }));
          break;
        case BoilsFilterParams.BASE:
          set((state) => ({ filter: { ...state.filter, baseCode: value } }));
          break;
        case BoilsFilterParams.MARKING:
          set((state) => ({ filter: { ...state.filter, marking: value } }));
          break;
        case BoilsFilterParams.BOIL_ASC:
          set((state) => ({ filter: { ...state.filter, boilAsc: value === "true" ? true : false } }));
          break;
        case BoilsFilterParams.STATES:
          set((state) => ({
            filter: { ...state.filter, states: values ? [...values] : [...state.filter.states] },
          }));
          break;
        default:
          break;
      }
    },
    setSelectedPlant: (value) => set(() => ({ selectedPlant: value })),
    fillPlantSelectorOptions: (values) =>
      set(() => ({ plantSelectorOptions: [{ id: 999999, value: "Все", abb: "" }, ...values] })),
    fillStateSelectorOptions: (values) => set(() => ({ stateSelectorOptions: [...values] })),

    // disableBoilClearFilterButton: {
    //   get derived() {
    //     const filter = get().filter;

    //     return filter.boil === initFilterValue.boil;
    //   },
    // },
  }))
);
