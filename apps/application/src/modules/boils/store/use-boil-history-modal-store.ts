import { create } from "zustand";

interface HistoryModalStore {
  open: boolean;

  boil_id: number | null;
  boil_value: string | null;
  title: string;
  cancelButtonEnabled: boolean;
  setOpen: (value: boolean) => void;
  setBoilValue: (value: string | null) => void;
  setTitle: (value: string) => void;
  setCancelButtonEnabled: (value: boolean) => void;
  setBoilId: (value: number | null) => void;
}

export const useBoilHistoryModalStore = create<HistoryModalStore>()((set) => ({
  open: false,
  boil_value: null,
  boil_id: null,
  title: "",
  cancelButtonEnabled: false,
  setOpen: (value) => set(() => ({ open: value })),
  setBoilValue: (value) => set(() => ({ boil_value: value })),
  setTitle: (value) => set(() => ({ title: value })),
  setCancelButtonEnabled: (value) => set(() => ({ cancelButtonEnabled: value })),
  setBoilId: (value) => set(() => ({ boil_id: value })),
}));
