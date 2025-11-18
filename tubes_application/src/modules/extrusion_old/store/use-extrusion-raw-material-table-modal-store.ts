import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ExtrusionRawMaterialTableModalStore {
  open: boolean;
  setOpen: (val: boolean) => void;
}
export const useExtrusionRawMaterialTableModalStore = create<ExtrusionRawMaterialTableModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);
