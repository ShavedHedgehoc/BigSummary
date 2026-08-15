import { useQuery } from "@tanstack/react-query";
import RecordService from "./services/record-service";

export const useCurrentRecords = (dto: FetchProductsDto) =>
  useQuery({
    queryKey: ["current_products", dto],
    queryFn: () => RecordService.getCurrentRecordsList(dto),
    enabled: !!dto.filter.plant,
    refetchInterval: 1000 * 10,
  });
