import type { CreateVarnishEntryDto } from "@/shared/api/services/params-service";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface VarnishEntryAlertModalStore {
  dto: CreateVarnishEntryDto | null;
  open: boolean;
  setOpen: (val: boolean) => void;
  setDto: (val: CreateVarnishEntryDto) => void;
  clearDto: () => void;
}
export const useVarnishEntryAlertModalStore = create<VarnishEntryAlertModalStore>()(
  devtools((set) => ({
    dto: {},
    open: false,
    setOpen: (value) => set(() => ({ open: value })),
    setDto: (value) => set(() => ({ dto: value })),
    clearDto: () => set(() => ({ dto: null })),
  }))
);
