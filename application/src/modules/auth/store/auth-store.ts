import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface IUserSettings {
  plant_id: number;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  roles: string[];
  settings: IUserSettings;
}

interface AuthStore {
  setToken: (accessToken: string) => void;
  clearToken: () => void;
  setUser: (user: IUser | null) => void;
  setAuth: (val: boolean) => void;
  accessToken: string | null;
  user: IUser | null;
  isAuth: boolean;
  lastCheckTime: Date | null;
  setLastCheckTime: (val: Date | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      accessToken: localStorage.getItem("accessToken") || null,
      user: null,
      isAuth: false,
      lastCheckTime: null,
      setToken(accessToken) {
        if (accessToken) localStorage.setItem("accessToken", accessToken);
        set(() => ({ accessToken: accessToken }));
      },
      clearToken() {
        localStorage.removeItem("accessToken");
      },
      setUser: (value) => set(() => ({ user: value ? value : null })),
      setAuth: (value) => set(() => ({ isAuth: value })),
      setLastCheckTime: (value) => set(() => ({ lastCheckTime: value })),
    }),
    { name: "AuthStore", store: "useAuthStore" }
  )
);
