import { UseQueryResult, useQuery } from "@tanstack/react-query";
import PlantService, { IPlant } from "./services/plant-service";

export const usePlants = (plant_name: string | null): UseQueryResult<IPlant> =>
  useQuery({
    queryKey: ["plant"],
    queryFn: () => PlantService.getPlantByName(plant_name),
    // enabled: !!plant_name,
  });
