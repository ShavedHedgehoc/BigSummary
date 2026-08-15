import { useQuery } from "@tanstack/react-query";
import TraceTrademarkService, { FetchTrademarksDto } from "../../shared/api/services/trace-trademark-service";

export const useTrademarks = (dto: FetchTrademarksDto) =>
  useQuery({
    queryKey: ["trademarks", dto],
    queryFn: () => TraceTrademarkService.getTrademarksWithFilter(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 30,
  });
