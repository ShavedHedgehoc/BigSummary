import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface PDFModalStore {
  open: boolean;
  record: IDocRow | null;
  setOpen: (value: boolean) => void;
  setRecord: (value: IDocRow | null) => void;
}

export const usePDFModalStore = create<PDFModalStore>()(
  devtools((set) => ({
    open: false,
    record: null,
    setOpen: (value) => set(() => ({ open: value })),
    setRecord: (value) => set(() => ({ record: value })),
  }))
);
