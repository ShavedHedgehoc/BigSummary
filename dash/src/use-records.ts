import { UseQueryResult, useQuery } from "@tanstack/react-query";
import RecordService, { SummaryResponse } from "./records-service";

export const useRecords = (): UseQueryResult<SummaryResponse> =>
  useQuery({
    queryKey: ["records"],
    queryFn: () => RecordService.getCurrentRecordsList(),
    refetchInterval: 1000 * 10,
  });
