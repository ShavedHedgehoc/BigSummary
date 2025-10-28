import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IPlant } from "../api/services/plant-service";

interface PlantStore {
  plants: IPlant[] | [];
  setPlants: (plants: IPlant[]) => void;
}

export const usePlantStore = create<PlantStore>()(
  devtools(
    (set) => ({
      plants: [],
      setPlants: (values) => set(() => ({ plants: [...values] })),
    }),
    { name: "PlantStore", store: "PlantStore" }
  )
);
