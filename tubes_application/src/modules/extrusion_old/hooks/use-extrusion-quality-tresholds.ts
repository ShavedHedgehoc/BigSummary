import ExtrusionService from "@/shared/api/services/extrusion-service";
import { useQuery } from "@tanstack/react-query";

export const useExtrusionQualityTresholds = (product_id: number | null) =>
  useQuery({
    queryKey: ["extrusion_quality_tresholds", product_id],
    queryFn: () => ExtrusionService.getQualityTresholdsByProductId(product_id),
    enabled: !!product_id,
    refetchInterval: 1000 * 30,
  });
