import { useQuery } from "@tanstack/react-query";
import TracePlantsService from "./services/trace-plants-service";

export const useTracePlants = () =>
  useQuery({
    queryKey: ["trace-plants"],
    queryFn: () => TracePlantsService.getAllPlants(),
  });
