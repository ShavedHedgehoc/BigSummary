import { useQuery } from "@tanstack/react-query";
import HistoryTypeService from "./services/history-types-service";

export const useBoilsHistoryTypes = () =>
  useQuery({
    queryKey: ["boils_history_types"],
    queryFn: () => HistoryTypeService.getBoilsHistoryTypes(),
  });
