import { useQuery } from "@tanstack/react-query";
import InventoryRowsService, { FetchInventoryRowsDto } from "../../shared/api/services/inventory-rows-service";

export const useInventoryRows = (dto: FetchInventoryRowsDto) =>
  useQuery({
    queryKey: ["inventory_rows", dto],
    queryFn: () => InventoryRowsService.getInventoryRowsByInventoryId(dto),
    enabled: !!dto.inventoryId,
    refetchInterval: 1000 * 10,
  });
