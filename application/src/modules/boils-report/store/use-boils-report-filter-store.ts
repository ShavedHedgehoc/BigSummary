import { create } from "zustand";

import { IPlant } from "../../../types";
import { devtools } from "zustand/middleware";
import { BoilsReportFilterParams } from "../filter/boils-report-filter-params";

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

export const useBoilsReportFilterStore = create<BoilsFilterStore>()(
  devtools((set) => ({
    filter: initFilterValue,
    selectedPlant: 999999,
    plantSelectorOptions: [],
    stateSelectorOptions: [],
    clearFilter: () => set(() => ({ filter: initFilterValue, selectedPlant: 999999 })),

    changeFilter: ({ key, value, values }) => {
      switch (key) {
        case BoilsReportFilterParams.BOIL:
          set((state) => ({ filter: { ...state.filter, boil: value } }));
          break;
        case BoilsReportFilterParams.PLANTS:
          set((state) => ({
            filter: { ...state.filter, plants: values ? [...values] : [...state.filter.plants] },
          }));
          break;
        case BoilsReportFilterParams.BASE:
          set((state) => ({ filter: { ...state.filter, baseCode: value } }));
          break;
        case BoilsReportFilterParams.MARKING:
          set((state) => ({ filter: { ...state.filter, marking: value } }));
          break;
        case BoilsReportFilterParams.BOIL_ASC:
          set((state) => ({ filter: { ...state.filter, boilAsc: value === "true" ? true : false } }));
          break;
        case BoilsReportFilterParams.STATES:
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
  }))
);
