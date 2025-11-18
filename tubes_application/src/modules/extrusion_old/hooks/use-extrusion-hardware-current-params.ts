import ExtrusionService from "@/shared/api/services/extrusion-service";

import { useQuery } from "@tanstack/react-query";

export const useExtrusionHardwareCurrentParams = (summary_id: number | null) =>
  useQuery({
    queryKey: ["extrusion_current_params", summary_id],
    queryFn: () => ExtrusionService.getHardwareCurrentParamsBySummaryId(summary_id),
    enabled: !!summary_id,
    refetchInterval: 1000 * 30,
  });
