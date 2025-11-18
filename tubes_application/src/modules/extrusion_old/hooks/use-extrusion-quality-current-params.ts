import ExtrusionService from "@/shared/api/services/extrusion-service";

import { useQuery } from "@tanstack/react-query";

export const useExtrusionQualityCurrentParams = (summary_id: number | null) =>
  useQuery({
    queryKey: ["extrusion_quality_current_params", summary_id],
    queryFn: () => ExtrusionService.getQualityCurrentParamsBySummaryId(summary_id),
    enabled: !!summary_id,
    refetchInterval: 1000 * 30,
  });
