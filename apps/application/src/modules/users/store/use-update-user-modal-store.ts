import { create } from "zustand";
import { IUserRow } from "../../../shared/api/services/user-service";

interface UserUpdateModalStore {
  id: number | null;
  user: IUserRow | null;
  open: boolean;
  name: string;
  editName: boolean;
  email: string;
  editEmail: boolean;
  selectedPlant: number | null;
  plantSelectorOptions: IPlant[] | [];
  plants: number[] | [];
  setId: (val: number) => void;
  setUser: (val: IUserRow | null) => void;
  setOpen: (val: boolean) => void;
  setName: (val: string) => void;
  setEditName: (val: boolean) => void;
  resetName: () => void;
  setEmail: (val: string) => void;
  setEditEmail: (val: boolean) => void;
  resetEmail: () => void;
  setSelectedPlant: (value: number) => void;
  fillPlantSelectorOptions: (values: IPlant[]) => void;
  setPlants: (value: FetchBoilsFilterFormField) => void;
}
export const useUserUpdateModalStore = create<UserUpdateModalStore>()((set) => ({
  id: null,
  user: null,
  open: false,
  name: "",
  editName: false,
  email: "",
  editEmail: false,
  selectedPlant: null,
  plantSelectorOptions: [],
  plants: [],
  setId: (val: number) => set(() => ({ id: val })),
  setUser: (val: IUserRow | null) => set(() => ({ user: val })),
  setOpen: (val: boolean) => set(() => ({ open: val })),
  setName: (val: string) => set(() => ({ name: val })),
  resetName: () => set((state) => ({ name: state.user?.name })),
  setEditName: (val: boolean) => set(() => ({ editName: val })),
  setEmail: (val: string) => set(() => ({ email: val })),
  setEditEmail: (val: boolean) => set(() => ({ editEmail: val })),
  resetEmail: () => set((state) => ({ email: state.user?.email })),
  setSelectedPlant: (value) => set(() => ({ selectedPlant: value })),
  fillPlantSelectorOptions: (values) =>
    set(() => ({ plantSelectorOptions: [{ id: 999999, value: "Не установлена", abb: "" }, ...values] })),
  setPlants: ({ values }) => set((state) => ({ plants: values ? [...values] : [...state.plants] })),
}));
