import { create } from "zustand";

const perPageValues = [10, 15, 20, 50, 90];

interface PaginationStore {
  page: number;
  perPage: number;
  setPage: (val: number) => void;
  prevPage: () => void;
  nextPage: () => void;
  changeLimit: (val: number) => void;
}

export const usePaginationStore = create<PaginationStore>()((set) => ({
  page: 1,
  perPage: perPageValues[0],
  setPage: (val: number) => set(() => ({ page: val })),
  prevPage: () => set((state) => ({ page: state.page - 1 })),
  nextPage: () => set((state) => ({ page: state.page + 1 })),
  changeLimit: (val: number) => set(() => ({ perPage: val })),
}));
