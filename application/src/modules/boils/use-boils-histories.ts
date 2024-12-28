import { useQuery } from "@tanstack/react-query";
import BoilService from "../../shared/api/services/boil-service";

export const useBoilsHistories = (id: number | null) =>
  useQuery({
    queryKey: ["boils_histories", id],
    queryFn: () => BoilService.getHistoriesByBoilId(id),
    enabled: !!id,
  });
