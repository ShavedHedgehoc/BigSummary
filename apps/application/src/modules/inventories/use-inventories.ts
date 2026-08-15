import { useQuery } from "@tanstack/react-query";
import InventoryService from "../../shared/api/services/inventory-service";

export const useInventories = (dto: FetchInventoryDocsDto) =>
  useQuery({
    queryKey: ["inventories_list", dto],
    queryFn: () => InventoryService.getInventoryListWithParams(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 10,
  });
