import { useQuery } from "@tanstack/react-query";
import TraceBatchService, { FetchTraceBatchWghtReportDetailDto } from "../../shared/api/services/trace-batchs-service";

export const useTraceBatchWghtReportDetail = (dto: FetchTraceBatchWghtReportDetailDto) =>
  useQuery({
    queryKey: ["wght_report_detail", dto],
    queryFn: () => TraceBatchService.getTraceBatchsWghtReportDetail(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 10,
  });
