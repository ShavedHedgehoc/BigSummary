import ExtrusionService from "@/shared/api/services/extrusion-service";

import { useQuery } from "@tanstack/react-query";

export const useExtrusionHardwareTresholds = (product_id: number | null) =>
  useQuery({
    queryKey: ["extrusion_hardware_tresholds", product_id],
    queryFn: () => ExtrusionService.getHardwareTresholdsByProductId(product_id),
    enabled: !!product_id,
    refetchInterval: 1000 * 30,
  });
