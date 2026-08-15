import { create } from "zustand";

interface BoilsReportHistoryModalStore {
  open: boolean;
  record_id: number | null;
  boil_value: string | null;
  title: string;
  setOpen: (value: boolean) => void;
  setRecordId: (value: number) => void;
  setTitle: (value: string) => void;
  setBoilValue: (value: string | null) => void;
}

export const useBoilsReportHistoryModalStore = create<BoilsReportHistoryModalStore>()((set) => ({
  open: false,
  record_id: null,
  boil_value: null,
  title: "",
  setOpen: (value) => set(() => ({ open: value })),
  setRecordId: (value) => set(() => ({ record_id: value })),
  setTitle: (value) => set(() => ({ title: value })),
  setBoilValue: (value) => set(() => ({ boil_value: value })),
}));
