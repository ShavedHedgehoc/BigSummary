import { create } from "zustand";

interface AppSummaryStore {
  current: boolean;
  setCurrent: (value: boolean) => void;
}
export const useAppSummaryStore = create<AppSummaryStore>()((set) => ({
  current: true,
  setCurrent: (value) => set(() => ({ current: value })),
}));
