import { useQuery } from "@tanstack/react-query";
import TubeConveyorsService from "./services/tube-conveyors-service";

export const useTubeConveyorsData = () =>
  useQuery({
    queryKey: ["tube_conveyors_data"],
    queryFn: () => TubeConveyorsService.getconveyorsData(),
    refetchInterval: 1000 * 10,
  });
