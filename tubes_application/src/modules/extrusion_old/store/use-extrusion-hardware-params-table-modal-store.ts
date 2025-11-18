import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ExtrusionHardwareParamsTableModalStore {
  open: boolean;
  setOpen: (val: boolean) => void;
}
export const useExtrusionHardwareParamsTableModalStore = create<ExtrusionHardwareParamsTableModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);
