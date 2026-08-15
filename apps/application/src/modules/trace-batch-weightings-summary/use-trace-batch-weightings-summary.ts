import { useQuery } from "@tanstack/react-query";
import TraceBatchService, { GetWeightingsSummaryDto } from "../../shared/api/services/trace-batchs-service";

export const useTraceBatchWeightingsSummary = (dto: GetWeightingsSummaryDto) =>
  useQuery({
    queryKey: ["trace_batch_weightings_summary", dto],
    queryFn: () => TraceBatchService.getWeightingsSummary(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 30,
  });
