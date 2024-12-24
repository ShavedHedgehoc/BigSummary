import { create } from "zustand";

interface EditModalStore {
  id: number | null;
  open: boolean;
  name: string;
  barcode: string;
  occupation: number | null;
  occupationsOptions: IOccupation[] | [];
  setId: (val: number) => void;
  setOpen: (val: boolean) => void;
  setName: (val: string) => void;
  setBarcode: (val: string) => void;
  setOccupation: (val: number) => void;
  fillOccupationOptions: (values: IOccupation[]) => void;
  clearData: () => void;
}
export const useEmployeesEditModalStore = create<EditModalStore>()((set) => ({
  id: null,
  open: false,
  name: "",
  barcode: "",
  occupation: null,
  occupationsOptions: [],
  setId: (val: number) => set(() => ({ id: val })),
  setOpen: (val: boolean) => set(() => ({ open: val })),
  setName: (val: string) => set(() => ({ name: val })),
  setBarcode: (val: string) => set(() => ({ barcode: val })),
  setOccupation: (val: number) => set(() => ({ occupation: val })),
  clearData: () => set(() => ({ name: "", barcode: "", occupation: null })),
  fillOccupationOptions: (values) => set(() => ({ occupationsOptions: [...values] })),
}));
