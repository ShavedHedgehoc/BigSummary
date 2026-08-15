import { create } from "zustand";

interface LoginFormStore {
  isLogin: boolean;
  name: string;
  email: string;
  password: string;
  setIsLogin: (value: boolean) => void;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
}

export const useLoginFormStore = create<LoginFormStore>()((set) => ({
  isLogin: true,
  name: "",
  email: "",
  password: "",
  setIsLogin: (value) => set(() => ({ isLogin: value })),
  setName: (value) => set(() => ({ name: value })),
  setEmail: (value) => set(() => ({ email: value })),
  setPassword: (value) => set(() => ({ password: value })),
}));
