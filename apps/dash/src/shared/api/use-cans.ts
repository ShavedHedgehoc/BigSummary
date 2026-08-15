import { UseQueryResult, useQuery } from "@tanstack/react-query";
import TraceCansService, { FetchCansDto, ITraceCanData } from "./services/trace-can-service";

export const useCans = (dto: FetchCansDto): UseQueryResult<ITraceCanData[]> =>
  useQuery({
    queryKey: ["cans", dto],
    queryFn: () => TraceCansService.getCansWithParams(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 10,
  });
