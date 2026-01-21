import { create } from "zustand";

interface DashStartModalStore {
  open: boolean;
  summary_id: number | null;
  boil_value: string | null;
  title: string;
  setOpen: (value: boolean) => void;
  setSummaryId: (value: number | null) => void;
  setTitle: (value: string) => void;
  setBoilValue: (value: string | null) => void;
}

export const useDashStartModalStore = create<DashStartModalStore>()((set) => ({
  open: false,
  summary_id: null,
  boil_value: null,
  title: "",
  setOpen: (value) => set(() => ({ open: value })),
  setSummaryId: (value) => set(() => ({ summary_id: value })),
  setTitle: (value) => set(() => ({ title: value })),
  setBoilValue: (value) => set(() => ({ boil_value: value })),
}));
