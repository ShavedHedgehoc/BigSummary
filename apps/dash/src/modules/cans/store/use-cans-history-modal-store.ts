import { create } from "zustand";

interface CansHistoryModalStore {
  open: boolean;
  canId: number | null;
  canName: string;
  setOpen: (value: boolean) => void;
  setCanId: (value: number | null) => void;
  setCanName: (value: string) => void;
}
export const useCansHistoryModalStore = create<CansHistoryModalStore>()((set) => ({
  open: false,
  canId: null,
  canName: "",
  setOpen: (value) => set(() => ({ open: value })),
  setCanId: (value) => set(() => ({ canId: value })),
  setCanName: (value) => set(() => ({ canName: value })),
}));
