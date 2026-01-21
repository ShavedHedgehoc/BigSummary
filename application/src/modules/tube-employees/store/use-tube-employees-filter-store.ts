import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { TubeEmployeesFilterParams } from "../filter/tube-employees-filter-params";
import { FetchTubeEmployeesFilter } from "../../../shared/api/services/tube-employees-service";

interface IRank {
  id: number;
  val: number;
  description: string;
}

interface TubeEmployeesFilterStore {
  filter: FetchTubeEmployeesFilter;
  rankSelectorOptions: IRank[] | [];
  selectedBannedOption: number;
  clearFilter: () => void;
  changeFilter: (value: FetchBoilsFilterFormField) => void;
  fillRankSelectorOptions: (values: IRank[]) => void;
  setSelectedBannedOption: (value: number) => void;
}

const initFilterValue: FetchTubeEmployeesFilter = {
  name: "",
  nameAsc: true,
  banned: [],
  ranks: [],
};

export const useTubeEmployeesFilterStore = create<TubeEmployeesFilterStore>()(
  devtools((set) => ({
    filter: initFilterValue,
    selectedBannedOption: 999999,
    rankSelectorOptions: [],
    bannedSelectorOptions: [],
    clearFilter: () => set(() => ({ filter: initFilterValue, selectedBannedOption: 999999 })),
    changeFilter: ({ key, value, values }) => {
      switch (key) {
        case TubeEmployeesFilterParams.NAME:
          set((state) => ({ filter: { ...state.filter, name: value } }));
          break;

        case TubeEmployeesFilterParams.NAME_ASC:
          set((state) => ({ filter: { ...state.filter, nameAsc: value === "true" ? true : false } }));
          break;
        case TubeEmployeesFilterParams.RANKS:
          set((state) => ({
            filter: { ...state.filter, ranks: values ? [...values] : [...state.filter.ranks] },
          }));
          break;
        case TubeEmployeesFilterParams.BANNED:
          set((state) => ({
            filter: { ...state.filter, banned: values ? [...values] : [...state.filter.banned] },
          }));
          break;
        default:
          break;
      }
    },
    fillRankSelectorOptions: (values) => set(() => ({ rankSelectorOptions: [...values] })),
    setSelectedBannedOption: (value) => set(() => ({ selectedBannedOption: value })),
  }))
);
