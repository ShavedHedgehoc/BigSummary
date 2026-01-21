import { useQuery } from "@tanstack/react-query";
import TubeTresholdsService, { FetchTubeTresholdsDto } from "../../shared/api/services/tube-tresholds-service";

export const useTubeVarnishTresholds = (dto: FetchTubeTresholdsDto) =>
  useQuery({
    queryKey: ["tube_varnish_tresholds", dto],
    queryFn: () => TubeTresholdsService.getVarnishTresholds(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 10,
  });
