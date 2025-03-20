import { UseQueryResult, useQuery } from "@tanstack/react-query";
import RecordService, { ActiveRecord } from "../../shared/api/services/record-service";

export const useProduct = (conveyor_name: string | null): UseQueryResult<ActiveRecord> =>
  useQuery({
    queryKey: ["product", conveyor_name],
    queryFn: () => RecordService.getActiveRecord(conveyor_name),
    refetchInterval: 5 * 1000,
    enabled: !!conveyor_name,
  });
