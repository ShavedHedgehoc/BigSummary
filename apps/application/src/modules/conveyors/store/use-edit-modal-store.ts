import { create } from "zustand";

interface EditModalStore {
  id: number | null;
  open: boolean;
  value: string;
  barcode: string;

  setId: (val: number) => void;
  setOpen: (val: boolean) => void;
  setValue: (val: string) => void;
  setBarcode: (val: string) => void;
  clearData: () => void;
}
export const useEditModalStore = create<EditModalStore>()((set) => ({
  id: null,
  open: false,
  value: "",
  barcode: "",

  setId: (val: number) => set(() => ({ id: val })),
  setOpen: (val: boolean) => set(() => ({ open: val })),
  setValue: (val: string) => set(() => ({ value: val })),
  setBarcode: (val: string) => set(() => ({ barcode: val })),
  clearData: () => set(() => ({ value: "", barcode: "", occupation: null })),
}));
