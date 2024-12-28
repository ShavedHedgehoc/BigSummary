import { useQuery } from "@tanstack/react-query";
import ConveyorService from "./services/conveyor-service";

export const useConveyors = () =>
  useQuery({
    queryKey: ["conveyors"],
    queryFn: () => ConveyorService.getConveyorsList(),
    refetchInterval: 1000 * 30,
  });
