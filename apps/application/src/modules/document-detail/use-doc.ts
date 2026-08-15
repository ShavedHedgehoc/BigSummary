import { useQuery } from "@tanstack/react-query";
import DocumentService from "../../shared/api/services/document-service";

export const useDoc = (id: string | undefined) =>
  useQuery({
    queryKey: ["document", id],
    queryFn: () => DocumentService.getDocumentById(id),
    enabled: !!id,
  });
