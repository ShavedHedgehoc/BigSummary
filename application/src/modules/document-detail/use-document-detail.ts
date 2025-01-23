import { useQuery } from "@tanstack/react-query";
import RecordService from "../../shared/api/services/record-service";

export const useDocumentDetail = (dto: FetchProductsWithDocIdDto) =>
  useQuery({
    queryKey: ["document_detail", dto],
    queryFn: () => RecordService.getRecordsByDocId(dto),
    enabled: !!dto.doc_id,
    refetchInterval: 1000 * 10,
  });
