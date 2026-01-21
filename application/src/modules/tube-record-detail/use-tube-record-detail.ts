import { useQuery } from "@tanstack/react-query";

import TubeRecordsService from "../../shared/api/services/tube-records-service";

export const useTubeRecordDetail = (id: string | undefined) =>
  useQuery({
    queryKey: ["tube_record_detail", id],
    queryFn: () => TubeRecordsService.getTubeRecordDetail(id),
    enabled: !!id,
    refetchInterval: 1000 * 10,
  });
