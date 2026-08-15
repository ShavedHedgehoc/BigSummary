import { UseQueryResult, useQuery } from "@tanstack/react-query";
import DocService, { SummaryResponse } from "./services/doc-service";

export const useDoc = (plant_id: number | null): UseQueryResult<SummaryResponse> =>
  useQuery({
    queryKey: ["doc"],
    queryFn: () => DocService.getCurrentRecordsList(plant_id),
    enabled: !!plant_id,
    refetchInterval: 1000 * 10,
  });
