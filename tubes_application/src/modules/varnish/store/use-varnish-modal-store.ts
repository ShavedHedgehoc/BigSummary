import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SimplyModalStore {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export const useVarnishAuthModalStore = create<SimplyModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);

export const useVarnishLogoutModalStore = create<SimplyModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);

export const useVarnishCloseConfirmModalStore = create<SimplyModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);

export const useVarnishMaterialScanModalStore = create<SimplyModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);

export const useVarnishCloseSummaryModalStore = create<SimplyModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);

export const useVarnishDefectInputModalStore = create<SimplyModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);
