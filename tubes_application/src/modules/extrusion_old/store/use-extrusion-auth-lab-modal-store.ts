import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ExtrusionAuthLabModalStore {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export const useExtrusionAuthLabModalStore = create<ExtrusionAuthLabModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);
