import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ExtrusionQualityParamsTableModalStore {
  open: boolean;
  setOpen: (val: boolean) => void;
}
export const useExtrusionQualityParamsTableModalStore = create<ExtrusionQualityParamsTableModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);
