import { useQuery } from "@tanstack/react-query";
import TraceBatchService, { FetchTraceBatchWghtReportDto } from "../../shared/api/services/trace-batchs-service";

export const useTraceBatchWghtReport = (dto: FetchTraceBatchWghtReportDto) =>
  useQuery({
    queryKey: ["wght_report", dto],
    queryFn: () => TraceBatchService.getTraceBatchsWghtReport(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 10,
  });
