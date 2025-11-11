import type { IEmployee } from "@/shared/api/services/employee-service";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ExtrusionEmployeeStore {
  extrusionEmployee: IEmployee | null;
  setExtrusionEmployee: (val: IEmployee) => void;
  clearExtrusionEmployee: () => void;
}

export const useExtrusionEmployeeStore = create<ExtrusionEmployeeStore>()(
  devtools((set) => ({
    extrusionEmployee: null,
    setExtrusionEmployee: (value) => set(() => ({ extrusionEmployee: value })),
    clearExtrusionEmployee: () => set(() => ({ extrusionEmployee: null })),
  }))
);
