import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface BoilsUploadValidateModalStore {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const useBoilsUploadValidateModalStore = create<BoilsUploadValidateModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);
