import type { ILaboratoryAssistant } from "@/shared/api/services/laboratory-assistant-service";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ExtrusionLabAssistantStore {
  extrusionLabAssistant: ILaboratoryAssistant | null;
  setExtrusionLabAssistant: (val: ILaboratoryAssistant) => void;
  clearExtrusionLabAssistant: () => void;
}

export const useExtrusionLabAssistantStore = create<ExtrusionLabAssistantStore>()(
  devtools((set) => ({
    extrusionLabAssistant: null,
    setExtrusionLabAssistant: (value) => set(() => ({ extrusionLabAssistant: value })),
    clearExtrusionLabAssistant: () => set(() => ({ extrusionLabAssistant: null })),
  }))
);
