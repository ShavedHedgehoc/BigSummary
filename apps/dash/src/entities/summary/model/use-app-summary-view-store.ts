import { create } from 'zustand';

interface AppSummaryViewStore {
  current: boolean;
  setCurrent: (value: boolean) => void;
}
export const useAppSummaryViewStore = create<AppSummaryViewStore>()((set) => ({
  current: true,
  setCurrent: (value) => set(() => ({ current: value })),
}));
