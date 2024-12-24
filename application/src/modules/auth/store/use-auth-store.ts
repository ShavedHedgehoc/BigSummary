import { create } from "zustand";

interface AuthStore {
  isAuth: boolean;
  user: IUser;
  roles: string[];
  setIsAuth: (value: boolean) => void;
  setUser: (value: IUser) => void;
  setRoles: (values: string[]) => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuth: false,
  user: {} as IUser,
  roles: [],
  setIsAuth: (value) => set(() => ({ isAuth: value })),
  setUser: (value) => set(() => ({ user: value })),
  setRoles: (values) => set(() => ({ roles: [...values] })),
}));
