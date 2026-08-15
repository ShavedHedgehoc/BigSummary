import { create } from "zustand";

interface HealthStore {
  isHealthy: boolean;
  init: boolean;
  setHealthy: (val: boolean) => void;
  setInit: (val: boolean) => void;
}

export const useHealthStore = create<HealthStore>()((set) => ({
  isHealthy: true,
  init: false,
  setHealthy: (val) => set(() => ({ isHealthy: val })),
  setInit: (val) => set(() => ({ init: val })),
}));
