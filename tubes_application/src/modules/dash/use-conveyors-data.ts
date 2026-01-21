import ConveyorService from "@/shared/api/services/conveyor-service";
import { useQuery } from "@tanstack/react-query";

export const useConveyorsData = () =>
  useQuery({
    queryKey: ["conveyors_data"],
    queryFn: () => ConveyorService.getAllConveyors(),
    refetchInterval: 1000 * 5,
  });
