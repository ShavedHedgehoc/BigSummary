import { create } from 'zustand';

interface CanFilterModalStore {
  open: boolean;
  setOpen: (value: boolean) => void;
}
export const useCanFilterModalStore = create<CanFilterModalStore>()((set) => ({
  open: false,
  setOpen: (value) => set(() => ({ open: value })),
}));
