import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface OffsetAuthModalStore {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export const useOffsetAuthModalStore = create<OffsetAuthModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);
