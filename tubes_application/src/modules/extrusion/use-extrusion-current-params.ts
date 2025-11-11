import ExtrusionService from "@/shared/api/services/extrusion-service";

import { useQuery } from "@tanstack/react-query";

export const useExtrusionCurrentParams = (summary_id: number | null) =>
  useQuery({
    queryKey: ["extrusion_current_params", summary_id],
    queryFn: () => ExtrusionService.getCurrentParamsBySummaryId(summary_id),
    enabled: !!summary_id,
    refetchInterval: 1000 * 30,
  });
