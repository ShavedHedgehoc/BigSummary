import ProductionBoxService from "@/shared/api/services/production-box-service";
import { useQuery } from "@tanstack/react-query";

export const useProductionBoxes = (summary_id: number | null) => {
  return useQuery({
    queryKey: ["production_boxes"],
    queryFn: () => ProductionBoxService.getProductionBoxes(summary_id),
    enabled: !!summary_id,
  });
};
