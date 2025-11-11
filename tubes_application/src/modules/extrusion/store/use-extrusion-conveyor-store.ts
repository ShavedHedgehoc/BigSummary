import type { IConveyor } from "@/shared/api/services/conveyor-service";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ExtrusionConveyorStore {
  extrusionConveyor: IConveyor | null;
  setExtrusionConveyor: (val: IConveyor) => void;
  clearExtrusionConveyor: () => void;
}

export const useExtrusionConveyorStore = create<ExtrusionConveyorStore>()(
  devtools((set) => ({
    extrusionConveyor: null,
    setExtrusionConveyor: (value) => set(() => ({ extrusionConveyor: value })),
    clearExtrusionConveyor: () => set(() => ({ extrusionConveyor: null })),
  }))
);
