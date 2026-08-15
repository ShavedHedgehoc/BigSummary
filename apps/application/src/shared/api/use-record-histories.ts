import { useQuery } from "@tanstack/react-query";
import RecordService from "./services/record-service";

export const useRecordHistories = (id: number | null) =>
  useQuery({
    queryKey: ["record_histories", id],
    queryFn: () => RecordService.getHistoriesByRecordId(id),
    enabled: !!id,
  });
