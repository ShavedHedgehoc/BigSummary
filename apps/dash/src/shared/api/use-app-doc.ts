import { UseQueryResult, useQuery } from "@tanstack/react-query";
import DocService, { SummaryResponse } from "./services/doc-service";

export const useAppDoc = (plant_id: number | null, current: boolean): UseQueryResult<SummaryResponse> =>
  useQuery({
    queryKey: ["app_doc", current, plant_id],
    queryFn: () => DocService.getCurrentApparatusesRecordsList(plant_id, current),
    enabled: !!plant_id,
    refetchInterval: 1000 * 10,
  });
