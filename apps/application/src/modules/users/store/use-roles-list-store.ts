import { create } from "zustand";

interface RolesListStore {
  rolesList: number[];
  addRole: (val: number) => void;
  removeRole: (val: number) => void;
  setRoles: (values: number[]) => void;
}

export const useRolesListStore = create<RolesListStore>()((set) => ({
  rolesList: [],

  addRole: (val: number) =>
    set((state) => ({
      rolesList: [...state.rolesList, val],
    })),
  removeRole: (val: number) =>
    set((state) => ({
      rolesList: [...state.rolesList.filter((item) => item !== val)],
    })),
  setRoles: (values: number[]) =>
    set(() => ({
      rolesList: [...values],
    })),
}));
