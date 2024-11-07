import { create } from "zustand";

interface OccupationFilterStore {
  occupations: number[] | [];
  changeOccupations: (values: number[] | []) => void;
  clearOccupations: () => void;
}

export const useOccupationsFilterStore = create<OccupationFilterStore>()((set) => ({
  occupations: [],
  changeOccupations: (values) => set(() => ({ occupations: values })),
  clearOccupations: () => set(() => ({ occupations: [] })),
}));
