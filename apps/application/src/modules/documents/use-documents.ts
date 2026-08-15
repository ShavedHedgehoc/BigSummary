import { useQuery } from "@tanstack/react-query";
import DocumentService from "../../shared/api/services/document-service";

export const useDocuments = (dto: FetchDocumentsDto) =>
  useQuery({
    queryKey: ["documents_list", dto],
    queryFn: () => DocumentService.getDocumentsListWithParams(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 10,
  });
