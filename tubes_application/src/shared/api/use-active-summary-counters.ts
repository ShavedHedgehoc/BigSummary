import SummaryService from "@/shared/api/services/summary-service";
import { useQuery } from "@tanstack/react-query";
// move counters to active summary
export const useActiveSummaryCounters = (summaryId: number | null) =>
  useQuery({
    queryKey: ["active_summary_counters", summaryId],
    queryFn: () => SummaryService.getActiveSummaryCountersBySummaryId(summaryId),
    enabled: !!summaryId,
    refetchInterval: 1000 * 30,
    retry: false,
  });
