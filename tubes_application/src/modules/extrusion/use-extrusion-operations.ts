import OperationService from "@/shared/api/services/operation-service";
import { useQuery } from "@tanstack/react-query";

export const useExtrusionOperations = (rank: number | null) => {
  return useQuery({
    queryKey: ["extrusion_operations"],
    queryFn: () => OperationService.getExtrusionOperations(rank),
  });
};
