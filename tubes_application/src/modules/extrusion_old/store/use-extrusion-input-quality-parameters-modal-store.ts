import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ExtrusionInputQualityParametersModalStore {
  open: boolean;
  setOpen: (val: boolean) => void;
}
export const useExtrusionInputQualityParametersModalStore = create<ExtrusionInputQualityParametersModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);
