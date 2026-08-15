import { create } from "zustand";

export const useTraceBatchWghtReportPaginationStore = create<PaginationStore>()((set) => ({
  page: 1,
  limit: 10,
  total: 0,
  increasePage: () => set((state) => ({ page: state.page + 1 })),
  decreasePage: () => set((state) => ({ page: state.page - 1 })),
  setTotal: (val) => set(() => ({ total: val })),
  setPage: (val) => set(() => ({ page: val })),
  setLimit: (val) => set(() => ({ limit: val })),
}));
