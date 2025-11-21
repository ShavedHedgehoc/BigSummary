import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SimplyModalStore {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export const useOffsetAuthModalStore = create<SimplyModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);

export const useOffsetLogoutModalStore = create<SimplyModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);

export const useOffsetCloseConfirmModalStore = create<SimplyModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);

export const useOffsetMaterialScanModalStore = create<SimplyModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);
