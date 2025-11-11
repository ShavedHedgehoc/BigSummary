import ExtrusionService from "@/shared/api/services/extrusion-service";

import { useQuery } from "@tanstack/react-query";

export const useExtrusionTresholds = (product_id: number | null) =>
  useQuery({
    queryKey: ["extrusion_tresholds", product_id],
    queryFn: () => ExtrusionService.getTresholdsByProductId(product_id),
    enabled: !!product_id,
    refetchInterval: 1000 * 30,
  });
