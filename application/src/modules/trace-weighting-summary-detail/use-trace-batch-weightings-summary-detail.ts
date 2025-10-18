import { useQuery } from "@tanstack/react-query";
import TraceBatchService, { GetWeightingsSummaryDetailDto } from "../../shared/api/services/trace-batchs-service";

export const useTraceBatchWeightingsSummaryDetail = (dto: GetWeightingsSummaryDetailDto) =>
  useQuery({
    queryKey: ["trace_batch_weightings_summary_detail", dto],
    queryFn: () => TraceBatchService.getWeightingsSummaryDetail(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 30,
  });
