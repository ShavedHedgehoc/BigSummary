import type { GetSummaryRawMaterialsBySummaryId } from "@/shared/api/services/summary-raw-materials-service";
import SummaryRawMaterialsService from "@/shared/api/services/summary-raw-materials-service";
import { useQuery } from "@tanstack/react-query";

export const useRawMaterials = (dto: GetSummaryRawMaterialsBySummaryId | null) =>
  useQuery({
    queryKey: ["raw_materials", dto],
    queryFn: () => SummaryRawMaterialsService.getSummaryRawMaterialsBySummaryId(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 30,
  });
