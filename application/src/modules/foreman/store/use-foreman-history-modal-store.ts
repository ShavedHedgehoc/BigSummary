import { create } from "zustand";

interface ForemanHistoryModalStore {
  open: boolean;
  record_id: number | null;
  boil_value: string | null;
  title: string;
  cancelStartButtonEnabled: boolean;
  cancelFinishButtonEnabled: boolean;
  setOpen: (value: boolean) => void;
  setRecordId: (value: number) => void;
  setTitle: (value: string) => void;
  setCancelStartButtonEnabled: (value: boolean) => void;
  setCancelFinishButtonEnabled: (value: boolean) => void;
  setBoilValue: (value: string | null) => void;
}

export const useForemanHistoryModalStore = create<ForemanHistoryModalStore>()((set) => ({
  open: false,
  record_id: null,
  boil_value: null,
  title: "",
  cancelStartButtonEnabled: false,
  cancelFinishButtonEnabled: false,
  setOpen: (value) => set(() => ({ open: value })),
  setRecordId: (value) => set(() => ({ record_id: value })),
  setTitle: (value) => set(() => ({ title: value })),
  setCancelStartButtonEnabled: (value) => set(() => ({ cancelStartButtonEnabled: value })),
  setCancelFinishButtonEnabled: (value) => set(() => ({ cancelFinishButtonEnabled: value })),
  setBoilValue: (value) => set(() => ({ boil_value: value })),
}));