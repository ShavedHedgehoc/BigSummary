import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface AddModalStore {
  open: boolean;
  name: string;
  barcode: string;
  occupation: number | null;
  occupationsOptions: IOccupation[] | [];
  setOpen: (val: boolean) => void;
  setName: (val: string) => void;
  setBarcode: (val: string) => void;
  setOccupation: (val: number) => void;
  fillOccupationOptions: (values: IOccupation[]) => void;
  clearData: () => void;
}
export const useEmployeeAddModalStore = create<AddModalStore>()(
  devtools(
    (set) => ({
      open: false,
      name: "",
      barcode: "",
      occupation: null,
      occupationsOptions: [],
      setOpen: (val: boolean) => set(() => ({ open: val })),
      setName: (val: string) => set(() => ({ name: val })),
      setBarcode: (val: string) => set(() => ({ barcode: val })),
      setOccupation: (val: number) => set(() => ({ occupation: val })),
      clearData: () =>
        set((state) => ({
          name: "",
          barcode: "",
          occupation: state.occupationsOptions.length > 0 ? state.occupationsOptions[1].id : null,
        })),
      fillOccupationOptions: (values) => set(() => ({ occupationsOptions: [...values] })),
    }),
    { name: "EmployeeAddModalStore", store: "useEmployeeAddModalStore" }
  )
);
