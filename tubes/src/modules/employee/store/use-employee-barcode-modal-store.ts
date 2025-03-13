import { create } from "zustand";

interface EmployeeBarcodeModalStore {
  open: boolean;
  barcode: string;
  setOpen: (val: boolean) => void;
  setBarcode: (val: string) => void;
}
export const useEmployeeBarcodeModalStore = create<EmployeeBarcodeModalStore>()((set) => ({
  open: false,
  barcode: "",
  setOpen: (val: boolean) => set(() => ({ open: val })),
  setBarcode: (val: string) => set(() => ({ barcode: val })),
}));
