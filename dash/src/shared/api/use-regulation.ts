import { UseQueryResult, useQuery } from "@tanstack/react-query";
import RegulationService, { RegulationResponce } from "./services/regulation-service";

export const useRegulation = (product_id: string | null): UseQueryResult<RegulationResponce> =>
  useQuery({
    queryKey: ["regulation", product_id],
    queryFn: () => RegulationService.getRegulationByProductId(product_id),
    enabled: !!product_id,
    refetchInterval: 1000 * 10,
  });
