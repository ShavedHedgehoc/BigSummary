import type { GetSummaryRawMaterialCurrentDto } from "@/shared/api/services/summary-raw-materials-current-service";
import SummaryRawMaterialsCurrentService from "@/shared/api/services/summary-raw-materials-current-service";
import { useQuery } from "@tanstack/react-query";

export const useRawMaterialsList = (dto: GetSummaryRawMaterialCurrentDto | null) =>
  useQuery({
    queryKey: ["raw_materials_list", dto],
    queryFn: () => SummaryRawMaterialsCurrentService.getCurrentRawMaterialsBySummaryIdAndPostId(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 10,
  });
