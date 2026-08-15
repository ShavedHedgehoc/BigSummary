import { create } from "zustand";

interface DocumentDetailAddHistoryModalStore {
  open: boolean;
  user_id: number | null;
  row: IDocRow | null;
  setOpen: (value: boolean) => void;
  setUserId: (value: number) => void;
  setRow: (value: IDocRow | null) => void;
}

export const useDocumentDetailAddHistoryModalStore = create<DocumentDetailAddHistoryModalStore>()((set) => ({
  open: false,
  user_id: null,
  row: null,
  setOpen: (value) => set(() => ({ open: value })),
  setUserId: (value) => set(() => ({ user_id: value })),
  setRow: (value) => set(() => ({ row: value })),
}));
