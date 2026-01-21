import { useQuery } from "@tanstack/react-query";
import TubeTresholdsService, { FetchTubeTresholdsDto } from "../../shared/api/services/tube-tresholds-service";

export const useTubeExtrusionTresholds = (dto: FetchTubeTresholdsDto) =>
  useQuery({
    queryKey: ["tube_extrusion_tresholds", dto],
    queryFn: () => TubeTresholdsService.getExtrusionTresholds(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 10,
  });
