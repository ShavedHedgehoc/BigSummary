import { useQuery } from "@tanstack/react-query";
import TraceCansService, { FetchCansListDto } from "../../shared/api/services/trace-cans-service";

export const useCansList = (dto: FetchCansListDto) =>
  useQuery({
    queryKey: ["cans_list", dto],
    queryFn: () => TraceCansService.getCansListWithParams(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 30,
  });
