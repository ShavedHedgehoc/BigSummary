import { create } from "zustand";

interface EmployeeBarcodeInputModalStore {
  id: number | null;
  open: boolean;
  barcode: string;
  setId: (val: number | null) => void;
  setOpen: (val: boolean) => void;
  setBarcode: (val: string) => void;
}
export const useEmployeeBarcodeInputModalStore = create<EmployeeBarcodeInputModalStore>()((set) => ({
  id: null,
  open: false,
  barcode: "",
  setId: (val: number | null) => set(() => ({ id: val })),
  setOpen: (val: boolean) => set(() => ({ open: val })),
  setBarcode: (val: string) => set(() => ({ barcode: val })),
}));
