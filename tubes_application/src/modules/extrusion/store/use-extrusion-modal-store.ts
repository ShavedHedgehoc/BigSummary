import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SimplyModalStore {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export const useExtrusionAuthModalStore = create<SimplyModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);

export const useExtrusionLogoutModalStore = create<SimplyModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);

export const useExtrusionCloseConfirmModalStore = create<SimplyModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);

export const useExtrusionMaterialScanModalStore = create<SimplyModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);

export const useExtrusionCloseSummaryModalStore = create<SimplyModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);

export const useExtrusionDefectInputModalStore = create<SimplyModalStore>()(
  devtools((set) => ({
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
  }))
);
