import { useQuery } from "@tanstack/react-query";
import SopService from "@/shared/api/services/sop-service";

export const useSealantSop = (operationId: number | null) =>
  useQuery({
    queryKey: ["sealant_sop", operationId],
    queryFn: () => SopService.getSealantSopPictures(operationId),
    enabled: !!operationId,
  });
