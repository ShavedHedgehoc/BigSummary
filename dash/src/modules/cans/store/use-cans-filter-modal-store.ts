import { create } from "zustand";

interface CansFilterModalStore {
  open: boolean;
  setOpen: (value: boolean) => void;
}
export const useCansFilterModalStore = create<CansFilterModalStore>()((set) => ({
  open: false,
  setOpen: (value) => set(() => ({ open: value })),
}));
