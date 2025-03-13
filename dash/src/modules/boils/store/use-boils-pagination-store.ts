import { create } from "zustand";
interface PaginationStore {
  page: number;
  limit: number;
  total: number;
  increasePage: () => void;
  decreasePage: () => void;
  setTotal: (val: number) => void;
  setLimit: (val: number) => void;
  setPage: (val: number) => void;
}

export const useBoilsPaginationStore = create<PaginationStore>()((set) => ({
  page: 1,
  limit: 19,
  total: 0,
  increasePage: () => set((state) => ({ page: state.page + 1 })),
  decreasePage: () => set((state) => ({ page: state.page - 1 })),
  setTotal: (val) => set(() => ({ total: val })),
  setPage: (val) => set(() => ({ page: val })),
  setLimit: (val) => set(() => ({ limit: val })),
}));
