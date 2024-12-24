import { useQuery } from "@tanstack/react-query";
import RecordService from "../../shared/api/services/record-service";

export const useForemanRecords = (dto: FetchProductsDto) =>
  useQuery({
    queryKey: ["foreman_products", dto],
    queryFn: () => RecordService.getCurrentRecordsList(dto),
    enabled: !!dto.filter.plant,
    refetchInterval: 1000 * 10,
  });
