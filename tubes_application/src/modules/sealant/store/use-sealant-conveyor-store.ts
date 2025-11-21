import type { IConveyor } from "@/shared/api/services/conveyor-service";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SealantConveyorStore {
  sealantConveyor: IConveyor | null;
  setSealantConveyor: (val: IConveyor) => void;
  clearSealantConveyor: () => void;
}

export const useSealantConveyorStore = create<SealantConveyorStore>()(
  devtools((set) => ({
    sealantConveyor: null,
    setSealantConveyor: (value) => set(() => ({ sealantConveyor: value })),
    clearSealantConveyor: () => set(() => ({ sealantConveyor: null })),
  }))
);
