import { UseQueryResult, useQuery } from "@tanstack/react-query";
import BoilService, { FetchBoilsDto, IBoilData } from "../../shared/api/services/boil-service";

export const useBoils = (dto: FetchBoilsDto): UseQueryResult<IBoilData> =>
  useQuery({
    queryKey: ["boils_list", dto],
    queryFn: () => BoilService.getBoilsListWithParams(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 10,
  });
