import type { IConveyor } from "@/shared/api/services/conveyor-service";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface VarnishConveyorStore {
  varnishConveyor: IConveyor | null;
  setVarnishConveyor: (val: IConveyor) => void;
  clearVarnishConveyor: () => void;
}

export const useVarnishConveyorStore = create<VarnishConveyorStore>()(
  devtools((set) => ({
    varnishConveyor: null,
    setVarnishConveyor: (value) => set(() => ({ varnishConveyor: value })),
    clearVarnishConveyor: () => set(() => ({ varnishConveyor: null })),
  }))
);
