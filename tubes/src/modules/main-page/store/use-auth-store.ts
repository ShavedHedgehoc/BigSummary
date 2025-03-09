import { create } from "zustand";

interface IOccupation {
  id: number;
  value: string;
  description: string;
}

interface IEmployee {
  id: number;
  name: string;
  barcode: string;
  occupation: IOccupation;
}

interface AuthStore {
  isAuthentificated: boolean;
  employee: IEmployee | null;
  setIsAuthentificated: (value: boolean) => void;
  setEmployee: (value: IEmployee | null) => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthentificated: false,
  employee: null,
  setIsAuthentificated: (value) => set(() => ({ isAuthentificated: value })),
  setEmployee: (value) => set(() => ({ employee: value })),
}));
