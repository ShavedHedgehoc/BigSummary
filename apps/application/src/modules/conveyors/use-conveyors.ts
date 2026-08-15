import { useQuery } from "@tanstack/react-query";
import ConveyorService, { FetchConveyorsDto } from "../../shared/api/services/conveyor-service";

export const useConveyors = (dto: FetchConveyorsDto) =>
  useQuery({
    queryKey: ["conveyors", dto],
    queryFn: () => ConveyorService.getConveyorsList(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 30,
  });
