import { UseQueryResult, useQuery } from "@tanstack/react-query";
import TraceCanRecordService, { ITraceCanRecord } from "./services/trace-cans-record-service";

export const useCanRecords = (id: number | null): UseQueryResult<ITraceCanRecord[]> =>
  useQuery({
    queryKey: ["can_records", id],
    queryFn: () => TraceCanRecordService.getLastTenRecords(id),
    enabled: !!id,
    refetchInterval: 1000 * 10,
  });
