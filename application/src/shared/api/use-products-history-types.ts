import { useQuery } from "@tanstack/react-query";
import HistoryTypeService from "./services/history-types-service";

export const useProductsHistoryTypes = () =>
  useQuery({
    queryKey: ["products_history_types"],
    queryFn: () => HistoryTypeService.getProductsHistoryTypes(),
  });
