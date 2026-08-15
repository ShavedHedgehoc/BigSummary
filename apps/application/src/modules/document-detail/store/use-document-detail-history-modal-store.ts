import { create } from "zustand";

interface DocumentDetailHistoryModalStore {
  open: boolean;
  record_id: number | null;
  boil_value: string | null;
  title: string;
  addButtonEnabled: boolean;
  setOpen: (value: boolean) => void;
  setRecordId: (value: number) => void;
  setTitle: (value: string) => void;
  setBoilValue: (value: string | null) => void;
  setAddButtonEnabled: (value: boolean) => void;
}

export const useDocumentDetailHistoryModalStore = create<DocumentDetailHistoryModalStore>()((set) => ({
  open: false,
  record_id: null,
  boil_value: null,
  title: "",
  addButtonEnabled: false,
  setOpen: (value) => set(() => ({ open: value })),
  setRecordId: (value) => set(() => ({ record_id: value })),
  setTitle: (value) => set(() => ({ title: value })),
  setBoilValue: (value) => set(() => ({ boil_value: value })),
  setAddButtonEnabled: (value) => set(() => ({ addButtonEnabled: value })),
}));
