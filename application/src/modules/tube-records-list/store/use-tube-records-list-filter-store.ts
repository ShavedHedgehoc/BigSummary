import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { TubeRecordsListFilterParams } from "../filter/tube-records-list-filter-params";
import { FetchTubeRecordsListFilter } from "../../../shared/api/services/tube-records-service";
import {
  getCurrentDay,
  getFirstDayOfCurrentMonth,
  getLastDayOfCurrentMonth,
} from "../../../shared/helpers/date-time-formatters";

interface IConveyor {
  id: number;
  name: string;
}

interface TubeRecordsListFilterStore {
  filter: FetchTubeRecordsListFilter;
  conveyorSelectorOptions: IConveyor[] | [];
  selectedStateOption: number;
  selectedConveyorOption: number;
  clearFilter: () => void;
  setDayToToday: () => void;
  changeFilter: (value: FetchBoilsFilterFormField) => void;
  fillConveyorSelectorOptions: (values: IConveyor[]) => void;
  setSelectedStateOption: (value: number) => void;
  setSelectedConveyorOption: (value: number) => void;
}

const initFilterValue: FetchTubeRecordsListFilter = {
  code: "",
  start_date: getFirstDayOfCurrentMonth().toJSON().slice(0, 10),
  end_date: getLastDayOfCurrentMonth().toJSON().slice(0, 10),
  states: [],
  conveyors: [],
};

export const useTubeRecordsListFilterStore = create<TubeRecordsListFilterStore>()(
  devtools((set) => ({
    filter: initFilterValue,

    selectedStateOption: 999999,
    selectedConveyorOption: 999999,

    conveyorSelectorOptions: [],

    clearFilter: () =>
      set(() => ({ filter: initFilterValue, selectedStateOption: 999999, selectedConveyorOption: 999999 })),
    setDayToToday: () =>
      set((state) => ({
        filter: {
          ...state.filter,
          start_date: getCurrentDay().toJSON().slice(0, 10),
          end_date: getCurrentDay().toJSON().slice(0, 10),
        },
      })),
    changeFilter: ({ key, value, values }) => {
      switch (key) {
        case TubeRecordsListFilterParams.CODE:
          set((state) => ({ filter: { ...state.filter, code: value } }));
          break;
        case TubeRecordsListFilterParams.START_DATE:
          set((state) => ({ filter: { ...state.filter, start_date: value } }));
          break;
        case TubeRecordsListFilterParams.END_DATE:
          set((state) => ({ filter: { ...state.filter, end_date: value } }));
          break;
        case TubeRecordsListFilterParams.CONVEYORS:
          set((state) => ({
            filter: { ...state.filter, conveyors: values ? [...values] : [...state.filter.conveyors] },
          }));
          break;
        case TubeRecordsListFilterParams.STATES:
          set((state) => ({
            filter: { ...state.filter, states: values ? [...values] : [...state.filter.states] },
          }));
          break;
        default:
          break;
      }
    },
    fillConveyorSelectorOptions: (values) =>
      set(() => ({ conveyorSelectorOptions: [{ id: 999999, name: "Все" }, ...values] })),
    setSelectedStateOption: (value) => set(() => ({ selectedStateOption: value })),
    setSelectedConveyorOption: (value) => set(() => ({ selectedConveyorOption: value })),
  }))
);
