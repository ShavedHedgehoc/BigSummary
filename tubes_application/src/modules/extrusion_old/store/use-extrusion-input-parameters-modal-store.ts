import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ExtrusionInputParametersModalStore {
  open: boolean;
  setOpen: (val: boolean) => void;
}
export const useExtrusionInputParametersModalStore = create<ExtrusionInputParametersModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);
