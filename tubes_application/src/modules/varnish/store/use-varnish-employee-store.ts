import type { IEmployee } from "@/shared/api/services/employee-service";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface VarnishEmployeeStore {
  varnishEmployee: IEmployee | null;
  setVarnishEmployee: (val: IEmployee) => void;
  clearVarnishEmployee: () => void;
}

export const useVarnishEmployeeStore = create<VarnishEmployeeStore>()(
  devtools((set) => ({
    varnishEmployee: null,
    setVarnishEmployee: (value) => set(() => ({ varnishEmployee: value })),
    clearVarnishEmployee: () => set(() => ({ varnishEmployee: null })),
  }))
);
