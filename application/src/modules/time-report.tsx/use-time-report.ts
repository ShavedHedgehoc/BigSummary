import { useQuery } from "@tanstack/react-query";
import RecordService, { TimeReportDto } from "../../shared/api/services/record-service";

export const useTimeReport = (dto: TimeReportDto) =>
  useQuery({
    queryKey: ["time_report", dto],
    queryFn: () => RecordService.timeReport(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 10,
  });
