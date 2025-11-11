import SummaryService from "@/shared/api/services/summary-service";
import { useQuery } from "@tanstack/react-query";

export const useActiveSummary = (conveyorId: number | null) =>
  useQuery({
    queryKey: ["active_summary", conveyorId],
    queryFn: () => SummaryService.getActiveSummaryRecordByConveyorId(conveyorId),
    enabled: !!conveyorId,
    refetchInterval: 1000 * 30,
  });
