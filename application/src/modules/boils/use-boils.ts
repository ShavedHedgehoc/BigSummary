import { useQuery } from "@tanstack/react-query";
import BoilService from "../../shared/api/services/boil-service";

export const useBoils = (dto: FetchBoilsDto) =>
  useQuery({
    queryKey: ["boils_list", dto],
    queryFn: () => BoilService.getBoilsListWithParams(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 30,
  });
