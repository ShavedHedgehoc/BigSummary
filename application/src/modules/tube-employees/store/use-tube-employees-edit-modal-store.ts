import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IRank } from "../../../shared/api/services/tube-ranks-service";

interface EditModalStore {
  id: number | null;
  open: boolean;
  name: string;
  barcode: string;
  rank: number | null;
  ranksOptions: IRank[] | [];
  setId: (val: number) => void;
  setOpen: (val: boolean) => void;
  setName: (val: string) => void;
  setBarcode: (val: string) => void;
  setRank: (val: number) => void;
  fillRanksOptions: (values: IRank[]) => void;
  clearData: () => void;
}
export const useTubeEmployeesEditModalStore = create<EditModalStore>()(
  devtools(
    (set) => ({
      id: null,
      open: false,
      name: "",
      barcode: "",
      rank: null,
      ranksOptions: [],
      setId: (val: number) => set(() => ({ id: val })),
      setOpen: (val: boolean) => set(() => ({ open: val })),
      setName: (val: string) => set(() => ({ name: val })),
      setBarcode: (val: string) => set(() => ({ barcode: val })),
      setRank: (val: number) => set(() => ({ rank: val })),
      clearData: () => set(() => ({ name: "", barcode: "", rank: null })),
      fillRanksOptions: (values) => set(() => ({ ranksOptions: [...values] })),
    }),
    { name: "EmployeeEditModalStore", store: "useEmployeeEditModalStore" }
  )
);
