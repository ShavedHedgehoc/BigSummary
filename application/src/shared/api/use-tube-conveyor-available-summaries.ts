import { useQuery } from "@tanstack/react-query";
import TubeRecordsService from "./services/tube-records-service";

export const useTubeConveyorAvailableSummaries = (id: number | null) =>
  useQuery({
    queryKey: ["tube_available_summaries", id],
    queryFn: () => TubeRecordsService.getAvailableTubeRecords(id),
    enabled: !!id,
  });
