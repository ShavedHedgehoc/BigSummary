import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SimplyModalStore {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export const useSealantAuthModalStore = create<SimplyModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);

export const useSealantLogoutModalStore = create<SimplyModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);

export const useSealantCloseConfirmModalStore = create<SimplyModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);

export const useSealantMaterialScanModalStore = create<SimplyModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);

export const useSealantCloseSummaryModalStore = create<SimplyModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);

export const useSealantBoxConfirmModalStore = create<SimplyModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);
