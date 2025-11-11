import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ExtrusionMaterialScanModalStore {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export const useExtrusionMaterialScanModalStore = create<ExtrusionMaterialScanModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);
