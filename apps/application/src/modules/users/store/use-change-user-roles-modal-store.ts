import { create } from "zustand";

interface ChangeUserRolesModalStore {
  id: number | null;
  open: boolean;
  setId: (val: number) => void;
  setOpen: (val: boolean) => void;
}
export const useChangeUserRolesModalStore = create<ChangeUserRolesModalStore>()((set) => ({
  id: null,
  open: false,
  setId: (val: number) => set(() => ({ id: val })),
  setOpen: (val: boolean) => set(() => ({ open: val })),
}));
