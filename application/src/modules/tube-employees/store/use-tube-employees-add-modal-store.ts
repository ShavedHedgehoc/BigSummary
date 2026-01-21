import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IRank } from "../../../shared/api/services/tube-ranks-service";

interface AddModalStore {
  open: boolean;
  name: string;
  barcode: string;
  rank: number | null;
  rankOptions: IRank[] | [];
  setOpen: (val: boolean) => void;
  setName: (val: string) => void;
  setBarcode: (val: string) => void;
  setRank: (val: number) => void;
  fillRankOptions: (values: IRank[]) => void;
  clearData: () => void;
}
export const useTubeEmployeesAddModalStore = create<AddModalStore>()(
  devtools(
    (set) => ({
      open: false,
      name: "",
      barcode: "",
      rank: null,
      rankOptions: [],
      setOpen: (val: boolean) => set(() => ({ open: val })),
      setName: (val: string) => set(() => ({ name: val })),
      setBarcode: (val: string) => set(() => ({ barcode: val })),
      setRank: (val: number) => set(() => ({ rank: val })),
      clearData: () =>
        set((state) => ({
          name: "",
          barcode: "",
          rank: state.rankOptions.length > 0 ? state.rankOptions[0].id : null,
        })),
      fillRankOptions: (values) => set(() => ({ rankOptions: [...values] })),
    }),
    { name: "TubeEmployeesAddModalStore", store: "useTubeEmployeesAddModalStore" }
  )
);
