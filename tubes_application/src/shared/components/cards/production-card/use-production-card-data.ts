import type { ISummary } from "@/shared/api/services/summary-service";
import { getLastCheckDate, getNoteData, getProductionData } from "@/shared/helpers/summary-data-parsers";

export default function useProductionCardData(postId: number, summaryData: ISummary | null) {
  const note = getNoteData(postId, summaryData);
  const production = getProductionData(postId, summaryData);
  const lastCheckDate = getLastCheckDate(postId, summaryData);

  return { note, production, lastCheckDate };
}
