import { create } from "zustand";

interface RecordHistoryModalStore {
  open: boolean;
  record_id: number | null;
  boil_value: string | null;
  title: string;
  cancelButtonEnabled: boolean;
  setOpen: (value: boolean) => void;
  setRecordId: (value: number) => void;
  setTitle: (value: string) => void;
  setCancelButtonEnabled: (value: boolean) => void;
  setBoilValue: (value: string | null) => void;
}

export const useRecordHistoryModalStore = create<RecordHistoryModalStore>()((set) => ({
  open: false,
  record_id: null,
  boil_value: null,
  title: "",
  cancelButtonEnabled: false,
  setOpen: (value) => set(() => ({ open: value })),
  setRecordId: (value) => set(() => ({ record_id: value })),
  setTitle: (value) => set(() => ({ title: value })),
  setCancelButtonEnabled: (value) => set(() => ({ cancelButtonEnabled: value })),
  setBoilValue: (value) => set(() => ({ boil_value: value })),
}));
