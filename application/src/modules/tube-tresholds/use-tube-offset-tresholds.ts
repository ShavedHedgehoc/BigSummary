import { useQuery } from "@tanstack/react-query";
import TubeTresholdsService, { FetchTubeTresholdsDto } from "../../shared/api/services/tube-tresholds-service";

export const useTubeOffsetTresholds = (dto: FetchTubeTresholdsDto) =>
  useQuery({
    queryKey: ["tube_offset_tresholds", dto],
    queryFn: () => TubeTresholdsService.getOffsetTresholds(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 10,
  });
