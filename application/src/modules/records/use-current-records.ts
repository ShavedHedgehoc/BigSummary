import { useQuery } from "@tanstack/react-query";
import RecordService from "../../shared/api/services/record-service";

export const useCurrentRecords = (dto: FetchProductsDto) =>
  useQuery({
    queryKey: ["current_products", dto],
    queryFn: () => RecordService.getCurrentRecordsList(dto),
    enabled: !!dto.filter.plant,
  });
