import { create } from "zustand";

interface ChangeUserRolesModalStore {
  id: number | null;
  open: boolean;
  //   name: string;
  //   barcode: string;
  //   occupation: number | null;

  setId: (val: number) => void;
  setOpen: (val: boolean) => void;
  //   setName: (val: string) => void;
  //   setBarcode: (val: string) => void;
  //   setOccupation: (val: number) => void;
  //   clearData: () => void;
}
export const useChangeUserRolesModalStore = create<ChangeUserRolesModalStore>()((set) => ({
  id: null,
  open: false,
  //   name: "",
  //   barcode: "",
  //   occupation: null,
  setId: (val: number) => set(() => ({ id: val })),
  setOpen: (val: boolean) => set(() => ({ open: val })),
  //   setName: (val: string) => set(() => ({ name: val })),
  //   setBarcode: (val: string) => set(() => ({ barcode: val })),
  //   setOccupation: (val: number) => set(() => ({ occupation: val })),
  //   clearData: () => set(() => ({ name: "", barcode: "", occupation: null })),
}));
