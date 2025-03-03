import { useQuery } from "@tanstack/react-query";
import TraceCansService, { FetchCansDto } from "../../shared/api/services/trace-cans-service";

export const useCans = (dto: FetchCansDto) =>
  useQuery({
    queryKey: ["cans", dto],
    queryFn: () => TraceCansService.getCansWithParams(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 10,
  });
