import type { IConveyor } from "@/shared/api/services/conveyor-service";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface OffsetConveyorStore {
  offsetConveyor: IConveyor | null;
  setOffsetConveyor: (val: IConveyor) => void;
  clearOffsetConveyor: () => void;
}

export const useOffsetConveyorStore = create<OffsetConveyorStore>()(
  devtools((set) => ({
    offsetConveyor: null,
    setOffsetConveyor: (value) => set(() => ({ offsetConveyor: value })),
    clearOffsetConveyor: () => set(() => ({ offsetConveyor: null })),
  }))
);
