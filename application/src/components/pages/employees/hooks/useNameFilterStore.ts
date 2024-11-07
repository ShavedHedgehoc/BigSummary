import { create } from "zustand";

interface NameFilterStore {
  nameFilter: string;
  changeNameFilter: (value: string) => void;
  clearNameFilter: () => void;
}

export const useNameFilterStore = create<NameFilterStore>()((set) => ({
  nameFilter: "",
  changeNameFilter: (value) => set(() => ({ nameFilter: value })),
  clearNameFilter: () => set(() => ({ nameFilter: "" })),
}));
