import { create } from "zustand";

interface EmployeeErrorModalStore {
  open: boolean;
  setOpen: (val: boolean) => void;
}
export const useEmployeeErrorModalStore = create<EmployeeErrorModalStore>()((set) => ({
  open: false,
  setOpen: (val: boolean) => set(() => ({ open: val })),
}));
