import { UseQueryResult, useQuery } from "@tanstack/react-query";
import RecordService, { SummaryResponse } from "./records-service";

export const useRecords = (plant_id: number | null): UseQueryResult<SummaryResponse> =>
  useQuery({
    queryKey: ["records"],
    queryFn: () => RecordService.getCurrentRecordsList(plant_id),
    enabled: !!plant_id,
    refetchInterval: 1000 * 10,
  });
