import { create } from "zustand";
import { FetchBoilsFilter } from "../../../shared/api/services/boil-service";

interface BoilsInputStore {
  filter: FetchBoilsFilter;
  setValue: (value: string) => void;
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

export const useBoilsInputStore = create<BoilsInputStore>()((set) => ({
  filter: initFilterValue,
  setValue: (val) => set((state) => ({ filter: { ...state.filter, boil: val } })),
}));
