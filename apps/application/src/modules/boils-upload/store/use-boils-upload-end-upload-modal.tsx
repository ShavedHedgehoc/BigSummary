import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface BoilsUploadEndUploadModalStore {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const useBoilsUploadEndUploadModalStore = create<BoilsUploadEndUploadModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);
