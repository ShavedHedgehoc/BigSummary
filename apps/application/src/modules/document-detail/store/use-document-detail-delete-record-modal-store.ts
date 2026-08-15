import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface DocumentDetailDeleteRecordlModalStore {
  open: boolean;
  id: number | null;
  setOpen: (value: boolean) => void;
  setId: (value: number | null) => void;
}

export const useDocumentDetailDeleteRecordlModalStore = create<DocumentDetailDeleteRecordlModalStore>()(
  devtools((set) => ({
    open: false,
    id: null,
    setOpen: (value) => set(() => ({ open: value })),
    setId: (value) => set(() => ({ id: value })),
  }))
);
