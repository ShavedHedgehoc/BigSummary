import { useQuery } from "@tanstack/react-query";
import TraceBatchService, { FetchTraceBatchsDto } from "../../shared/api/services/trace-batchs-service";

export const useTraceBatchs = (dto: FetchTraceBatchsDto) =>
  useQuery({
    queryKey: ["trace_batchs", dto],
    queryFn: () => TraceBatchService.getTraceBatchsWithFilter(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 30,
  });
