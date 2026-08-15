import { $api } from "../http";

export default class InventoryService {
  static async getInventoryListWithParams(dto: FetchInventoryDocsDto): Promise<IInventoryDocsData> {
    const res = await $api.post(`/trace-inventory-docs/get-inventories`, dto);
    return res.data;
  }

  static async getInventoryById(id: string | undefined): Promise<IInventoryDoc> {
    const res = await $api.get(`/trace-inventory-docs/${id}`);
    return res.data;
  }
}
