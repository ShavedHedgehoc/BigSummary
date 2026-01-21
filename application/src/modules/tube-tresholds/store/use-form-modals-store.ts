import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ModalStore {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export const useTubeTresholdsExtrusionFormModalStore = create<ModalStore>()(
  devtools(
    (set) => ({
      open: false,
      setOpen: (val: boolean) => set(() => ({ open: val })),
    }),
    { name: "TubeTresholdsExtrusionFormModalStore", store: "TubeTresholdsExtrusionFormModalStore" }
  )
);
