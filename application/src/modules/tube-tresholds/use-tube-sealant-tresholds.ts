import { useQuery } from "@tanstack/react-query";
import TubeTresholdsService, { FetchTubeTresholdsDto } from "../../shared/api/services/tube-tresholds-service";

export const useTubeSealantTresholds = (dto: FetchTubeTresholdsDto) =>
  useQuery({
    queryKey: ["tube_sealant_tresholds", dto],
    queryFn: () => TubeTresholdsService.getSealantTresholds(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 10,
  });
