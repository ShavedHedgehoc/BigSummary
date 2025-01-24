import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface DocumentDetailEditRecordlModalStore {
  open: boolean;
  updated: boolean;
  plan: string;
  apparatus: string;
  can: string;
  conveyor: string;
  note: string;
  row: IDocRow | null;
  setOpen: (value: boolean) => void;
  setUpdated: (value: boolean) => void;
  setPlan: (value: string) => void;
  setApparatus: (value: string) => void;
  setCan: (value: string) => void;
  setConveyor: (value: string) => void;
  setNote: (value: string) => void;
  setRow: (value: IDocRow | null) => void;
}

export const useDocumentDetailEditRecordlModalStore = create<DocumentDetailEditRecordlModalStore>()(
  devtools((set) => ({
    open: false,
    updated: false,
    plan: "",
    apparatus: "",
    can: "",
    conveyor: "",
    note: "",
    row: null,
    setOpen: (value) => set(() => ({ open: value })),
    setUpdated: (value) => set(() => ({ updated: value })),
    setPlan: (value) => set(() => ({ plan: value })),
    setApparatus: (value) => set(() => ({ apparatus: value })),
    setCan: (value) => set(() => ({ can: value })),
    setConveyor: (value) => set(() => ({ conveyor: value })),
    setNote: (value) => set(() => ({ note: value })),
    setRow: (value) => set(() => ({ row: value })),
  }))
);
