import { useQuery } from "@tanstack/react-query";
import HistoryTypeService from "./services/history-types-service";

export const useAllHistoryTypes = () =>
  useQuery({
    queryKey: ["all_history_types"],
    queryFn: () => HistoryTypeService.getAllHistoryTypes(),
  });
