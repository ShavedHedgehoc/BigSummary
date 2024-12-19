import { UseQueryResult, useQuery } from "@tanstack/react-query";
import DocService, { IDocRow } from "./services/doc-service";

export const useRecord = (record_id: number | null): UseQueryResult<IDocRow> =>
  useQuery({
    queryKey: ["record"],
    queryFn: () => DocService.getRecord(record_id),
    enabled: !!record_id,
    refetchInterval: 1000 * 10,
  });
