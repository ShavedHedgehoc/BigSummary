import { create } from "zustand";

interface NameSortOrderStore {
  asc: boolean;
  changeSortOrder: () => void;
}

export const useNameSortOrderStore = create<NameSortOrderStore>()((set) => ({
  asc: true,
  changeSortOrder: () => set((state) => ({ asc: !state.asc })),
  clearSortOrder: () => set(() => ({ asc: true })),
}));
