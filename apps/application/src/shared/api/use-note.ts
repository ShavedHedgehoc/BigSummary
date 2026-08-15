import { useQuery } from "@tanstack/react-query";
import NoteService from "./services/note-service";

export const useNote = (id: number) =>
  useQuery({
    queryKey: ["note", id],
    queryFn: () => NoteService.getNoteById(id),
    enabled: !!id,
  });
