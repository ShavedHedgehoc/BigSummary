import ProductionBoxService from "@/shared/api/services/production-box-service";
import { useQuery } from "@tanstack/react-query";

export const useProductionBoxes = (batch_id: number | null) => {
  return useQuery({
    queryKey: ["production_boxes"],
    queryFn: () => ProductionBoxService.getProductionBoxes(batch_id),
    enabled: !!batch_id,
  });
};
