import { useQuery } from "@tanstack/react-query";
import SopService from "@/shared/api/services/sop-service";

export const useExtrusionSop = (operationId: number | null) =>
  useQuery({
    queryKey: ["extrusion_sop", operationId],
    queryFn: () => SopService.getExtrusionSopPictures(operationId),
    enabled: !!operationId,
  });
