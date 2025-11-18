import ChiefTechnologistNoteService from "@/shared/api/services/chief-technologist-note-service";
import { useQuery } from "@tanstack/react-query";

export const useChiefTechnologistNote = (summary_id: number | null) =>
  useQuery({
    queryKey: ["chief_technologist_note", summary_id],
    queryFn: () => ChiefTechnologistNoteService.getNoteBySummaryId(summary_id),
    enabled: !!summary_id,
    refetchInterval: 1000 * 30,
  });
