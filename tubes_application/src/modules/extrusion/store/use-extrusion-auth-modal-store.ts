import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ExtrusionAuthModalStore {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export const useExtrusionAuthModalStore = create<ExtrusionAuthModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);
