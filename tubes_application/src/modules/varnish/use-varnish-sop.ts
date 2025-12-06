import { useQuery } from "@tanstack/react-query";
import SopService from "@/shared/api/services/sop-service";

export const useVarnishSop = (operationId: number | null) =>
  useQuery({
    queryKey: ["varnish_sop", operationId],
    queryFn: () => SopService.getVarnishSopPictures(operationId),
    enabled: !!operationId,
  });
