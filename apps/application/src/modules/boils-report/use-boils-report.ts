import { useQuery } from "@tanstack/react-query";
import BoilService from "../../shared/api/services/boil-service";

export const useBoilsReport = (dto: FetchBoilsDto) =>
  useQuery({
    queryKey: ["boils_report", dto],
    queryFn: () => BoilService.getBoilsReportWithParams(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 10,
  });
