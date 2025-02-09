import { create } from "zustand";

interface DocumentDetailAddHistoryModalStore {
  open: boolean;
  user_id: number | null;
  row: IDocRow | null;

  // record_id: number | null;
  // plant_id: number | null;

  // boil_value: string | null;
  // title: string;
  // addButtonEnabled: boolean;
  setOpen: (value: boolean) => void;
  setUserId: (value: number) => void;
  setRow: (value: IDocRow | null) => void;
  // setRecordId: (value: number) => void;
  // setPlantId: (value: number) => void;

  // setTitle: (value: string) => void;
  // setBoilValue: (value: string | null) => void;
  // setAddButtonEnabled: (value: boolean) => void;
}

export const useDocumentDetailAddHistoryModalStore = create<DocumentDetailAddHistoryModalStore>()((set) => ({
  open: false,
  user_id: null,
  row: null,
  // record_id: null,
  // plant_id: null,

  // boil_value: null,
  // title: "",
  // addButtonEnabled: false,
  setOpen: (value) => set(() => ({ open: value })),
  setUserId: (value) => set(() => ({ user_id: value })),
  setRow: (value) => set(() => ({ row: value })),
  // setRecordId: (value) => set(() => ({ record_id: value })),
  // setPlantId: (value) => set(() => ({ record_id: value })),

  // setTitle: (value) => set(() => ({ title: value })),
  // setBoilValue: (value) => set(() => ({ boil_value: value })),
  // setAddButtonEnabled: (value) => set(() => ({ addButtonEnabled: value })),
}));
