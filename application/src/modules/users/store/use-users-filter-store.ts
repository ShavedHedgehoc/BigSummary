import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { UsersFilterParams } from "../users-filter-params";

interface UsersFilterStore {
  filter: FetchUsersFilter;
  selectedBannedOption: number;
  roleSelectorOptions: IRole[] | [];
  bannedSelectorOptions: FetchUsersFilterFormField[] | [];
  clearFilter: () => void;
  changeFilter: (value: FetchUsersFilterFormField) => void;
  setSelectedBannedOption: (value: number) => void;
  fillRoleSelectorOptions: (values: IRole[]) => void;
}

const initFilterValue: FetchUsersFilter = {
  name: "",
  nameAsc: true,
  email: "",
  banned: [],
  roles: [],
};

export const useUsersFilterStore = create<UsersFilterStore>()(
  devtools((set) => ({
    filter: initFilterValue,
    selectedBannedOption: 999999,
    roleSelectorOptions: [],
    bannedSelectorOptions: [],
    clearFilter: () => set(() => ({ filter: initFilterValue, selectedBannedOption: 999999 })),
    changeFilter: ({ key, value, values }) => {
      switch (key) {
        case UsersFilterParams.NAME:
          set((state) => ({ filter: { ...state.filter, name: value } }));
          break;
        case UsersFilterParams.EMAIL:
          set((state) => ({ filter: { ...state.filter, email: value } }));
          break;
        case UsersFilterParams.BANNED:
          set((state) => ({
            filter: { ...state.filter, banned: values ? [...values] : [...state.filter.banned] },
          }));
          break;
        case UsersFilterParams.NAME_ASC:
          set((state) => ({ filter: { ...state.filter, nameAsc: value === "true" ? true : false } }));
          break;
        case UsersFilterParams.ROLES:
          set((state) => ({
            filter: { ...state.filter, roles: values ? [...values] : [...state.filter.roles] },
          }));
          break;
        default:
          break;
      }
    },
    setSelectedBannedOption: (value) => set(() => ({ selectedBannedOption: value })),
    fillRoleSelectorOptions: (values) => set(() => ({ roleSelectorOptions: [...values] })),
  }))
);
