import { UseQueryResult, useQuery } from "@tanstack/react-query";
import TraceCansService, { ITraceCanRecord } from "../../shared/api/services/trace-cans-service";

export const useCanRecords = (id: number | null): UseQueryResult<ITraceCanRecord[]> =>
  useQuery({
    queryKey: ["can_records", id],
    queryFn: () => TraceCansService.getLastTenRecords(id),
    enabled: !!id,
    refetchInterval: 1000 * 10,
  });
