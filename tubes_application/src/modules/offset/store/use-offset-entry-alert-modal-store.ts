import type { CreateOffsetEntryDto } from "@/shared/api/services/params-service";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface OffsetEntryAlertModalStore {
  dto: CreateOffsetEntryDto | null;
  open: boolean;
  setOpen: (val: boolean) => void;
  setDto: (val: CreateOffsetEntryDto) => void;
  clearDto: () => void;
}
export const useEOffsetEntryAlertModalStore = create<OffsetEntryAlertModalStore>()(
  devtools((set) => ({
    dto: {},
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
    setDto: (value) => set(() => ({ dto: value })),
    clearDto: () => set(() => ({ dto: null })),
  }))
);
