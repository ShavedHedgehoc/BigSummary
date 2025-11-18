import type { IEmployee } from "@/shared/api/services/employee-service";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface OffsetEmployeeStore {
  offsetEmployee: IEmployee | null;
  setOffsetEmployee: (val: IEmployee) => void;
  clearOffsetEmployee: () => void;
}

export const useOffsetEmployeeStore = create<OffsetEmployeeStore>()(
  devtools((set) => ({
    offsetEmployee: null,
    setOffsetEmployee: (value) => set(() => ({ offsetEmployee: value })),
    clearOffsetEmployee: () => set(() => ({ offsetEmployee: null })),
  }))
);
