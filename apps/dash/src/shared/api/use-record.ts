import { UseQueryResult, useQuery } from "@tanstack/react-query";
import DocService, { RecordDetail } from "./services/doc-service";

export const useRecord = (record_id: number | null): UseQueryResult<RecordDetail> =>
  useQuery({
    queryKey: ["record"],
    queryFn: () => DocService.getRecord(record_id),
    enabled: !!record_id,
    refetchInterval: 1000 * 10,
  });
