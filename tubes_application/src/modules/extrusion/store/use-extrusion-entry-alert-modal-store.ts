import type { CreateExtrusionEntryDto } from "@/shared/api/services/params-service";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ExtrusionEntryAlertModalStore {
  dto: CreateExtrusionEntryDto | null;
  open: boolean;
  setOpen: (val: boolean) => void;
  setDto: (val: CreateExtrusionEntryDto) => void;
  clearDto: () => void;
}
export const useExtrusionEntryAlertModalStore = create<ExtrusionEntryAlertModalStore>()(
  devtools((set) => ({
    dto: {},
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
    setDto: (value) => set(() => ({ dto: value })),
    clearDto: () => set(() => ({ dto: null })),
  }))
);
