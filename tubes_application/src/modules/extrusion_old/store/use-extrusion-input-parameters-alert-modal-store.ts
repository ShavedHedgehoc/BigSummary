import type { CreateExtrusionHardwareParamsRecordDto } from "@/shared/api/services/extrusion-service";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ExtrusionInputParametersAlertModalStore {
  dto: CreateExtrusionHardwareParamsRecordDto | null;
  open: boolean;
  setOpen: (val: boolean) => void;
  setDto: (val: CreateExtrusionHardwareParamsRecordDto) => void;
  clearDto: () => void;
}
export const useExtrusionInputParametersAlertModalStore = create<ExtrusionInputParametersAlertModalStore>()(
  devtools((set) => ({
    dto: {},
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
    setDto: (value) => set(() => ({ dto: value })),
    clearDto: () => set(() => ({ dto: null })),
  }))
);
