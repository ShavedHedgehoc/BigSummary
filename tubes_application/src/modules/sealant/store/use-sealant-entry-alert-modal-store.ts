import type { CreateSealantEntryDto } from "@/shared/api/services/params-service";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SealantEntryAlertModalStore {
  dto: CreateSealantEntryDto | null;
  open: boolean;
  setOpen: (val: boolean) => void;
  setDto: (val: CreateSealantEntryDto) => void;
  clearDto: () => void;
}
export const useSealantEntryAlertModalStore = create<SealantEntryAlertModalStore>()(
  devtools((set) => ({
    dto: {},
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
    setDto: (value) => set(() => ({ dto: value })),
    clearDto: () => set(() => ({ dto: null })),
  }))
);
