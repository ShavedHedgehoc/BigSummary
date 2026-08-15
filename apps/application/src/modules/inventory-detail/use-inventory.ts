import { useQuery } from "@tanstack/react-query";
import InventoryService from "../../shared/api/services/inventory-service";

export const useInventory = (id: string | undefined) =>
  useQuery({
    queryKey: ["inventory", id],
    queryFn: () => InventoryService.getInventoryById(id),
    enabled: !!id,
  });
