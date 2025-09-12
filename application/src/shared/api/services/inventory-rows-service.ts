import { $api } from "../http";

export interface InventoryRowsData {
  id: number;
  product_id: string;
  product_name: string;
  lot_id: number;
  lot_name: string;
  quantity: number;
  exp_date: Date;
  author_name: string;
  days_to_exp: number;
}

export interface FetchInventoryRowsFilter {
  productCode: string;
  dayToExpire: number;
  toFilter: boolean;
}

export interface FetchInventoryRowsDto {
  inventoryId: string | undefined;
  filter: FetchInventoryRowsFilter;
}

export default class InventoryRowsService {
  static async getInventoryRowsByInventoryId(dto: FetchInventoryRowsDto): Promise<InventoryRowsData[]> {
    const res = await $api.post(`/trace-inventory-rows`, dto);
    return res.data;
  }
}
