import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { FetchTubeTresholdsFilter } from "../../../shared/api/services/tube-tresholds-service";
import { ITubeConveyor } from "../../../shared/api/services/tube-conveyors-service";
import { TubeTresholdsFilterParams } from "../filter/tube-tresholds-filter-params";

interface TubeTresholdsFilterStore {
  filter: FetchTubeTresholdsFilter;
  conveyorSelectorOptions: ITubeConveyor[] | [];
  selectedEmptyOption: number;
  selectedConveyorOption: number;
  clearFilter: () => void;
  changeFilter: (value: FetchBoilsFilterFormField) => void;
  fillConveyorSelectorOptions: (values: ITubeConveyor[]) => void;
  setSelectedEmptyOption: (value: number) => void;
  setSelectedConveyorOption: (value: number) => void;
}

const initFilterValue: FetchTubeTresholdsFilter = {
  code: "",
  marking: "",
  empty: [],
  conveyors: [],
};

export const useTubeTresholdsFilterStore = create<TubeTresholdsFilterStore>()(
  devtools((set) => ({
    filter: initFilterValue,
    selectedEmptyOption: 999999,
    selectedConveyorOption: 999999,
    conveyorSelectorOptions: [],

    clearFilter: () =>
      set(() => ({ filter: initFilterValue, selectedEmptyOption: 999999, selectedConveyorOption: 999999 })),
    changeFilter: ({ key, value, values }) => {
      switch (key) {
        case TubeTresholdsFilterParams.CODE:
          set((state) => ({ filter: { ...state.filter, code: value } }));
          break;
        case TubeTresholdsFilterParams.MARKING:
          set((state) => ({ filter: { ...state.filter, marking: value } }));
          break;
        case TubeTresholdsFilterParams.CONVEYORS:
          set((state) => ({
            filter: { ...state.filter, conveyors: values ? [...values] : [...state.filter.conveyors] },
          }));
          break;
        case TubeTresholdsFilterParams.EMPTY:
          set((state) => ({
            filter: { ...state.filter, empty: values ? [...values] : [...state.filter.empty] },
          }));
          break;
        default:
          break;
      }
    },
    fillConveyorSelectorOptions: (values) =>
      set(() => ({ conveyorSelectorOptions: [{ id: 999999, name: "Все" }, ...values] })),
    setSelectedEmptyOption: (value) => set(() => ({ selectedEmptyOption: value })),
    setSelectedConveyorOption: (value) => set(() => ({ selectedConveyorOption: value })),
  }))
);
