import type { IEmployee } from "@/shared/api/services/employee-service";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SealantEmployeeStore {
  sealantEmployee: IEmployee | null;
  setSealantEmployee: (val: IEmployee) => void;
  clearSealantEmployee: () => void;
}

export const useSealantEmployeeStore = create<SealantEmployeeStore>()(
  devtools((set) => ({
    sealantEmployee: null,
    setSealantEmployee: (value) => set(() => ({ sealantEmployee: value })),
    clearSealantEmployee: () => set(() => ({ sealantEmployee: null })),
  }))
);
