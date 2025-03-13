import { UseQueryResult, useQuery } from "@tanstack/react-query";
import RecordService, { ActiveRecord } from "../../shared/api/services/record-service";

export const useActiveRecords = (conveyor_name: string | null): UseQueryResult<ActiveRecord[]> =>
  useQuery({
    queryKey: ["active_records", conveyor_name],
    queryFn: () => RecordService.getActiveRecordsByConveyorName(conveyor_name),
    refetchInterval: 5 * 1000,
    enabled: !!conveyor_name,
  });
