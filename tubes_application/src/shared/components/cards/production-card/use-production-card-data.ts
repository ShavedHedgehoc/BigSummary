import type { ISummary } from "@/shared/api/services/summary-service";
import {
  getIdleTime,
  getLastCheckDate,
  getNoteData,
  getProductionData,
  getStatusData,
} from "@/shared/helpers/summary-data-parsers";
import { useDate } from "@/shared/helpers/use-date";

export default function useProductionCardData(postId: number, summaryData: ISummary | null) {
  const { today } = useDate();
  const note = getNoteData(postId, summaryData);
  const production = getProductionData(postId, summaryData);
  const lastCheckDate = getLastCheckDate(postId, summaryData);
  const operationStatus = getStatusData(postId, summaryData);
  const idleTime = getIdleTime(postId, summaryData);

  return { note, production, lastCheckDate, operationStatus, idleTime, today };
}
