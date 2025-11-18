import ExtrusionService from "@/shared/api/services/extrusion-service";

import { useQuery } from "@tanstack/react-query";

export const useExtrusionHardwareAllParams = (summary_id: number | null) =>
  useQuery({
    queryKey: ["extrusion_all_params", summary_id],
    queryFn: () => ExtrusionService.getHardwareAllParamsBySummaryId(summary_id),
    enabled: !!summary_id,
    refetchInterval: 1000 * 30,
  });
