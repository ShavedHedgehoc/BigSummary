import { useQuery } from "@tanstack/react-query";
import PlantService from "../../services/PlantService";

export const usePlants = () =>
  useQuery({
    queryKey: ["plants"],
    queryFn: () => PlantService.getAllPlants(),
  });
