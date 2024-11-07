import { $api } from "../http";

export default class HistoryTypeService {
  //   static async getHistoryTypes(): Promise<AxiosResponse<IHistoryType[]>> {
  //     return $api.get(`/history-types`);
  //   }
  static async getAllHistoryTypes(): Promise<IHistoryType[]> {
    const res = await $api.get(`/history-types`);
    return res.data;
  }

  static async getBoilsHistoryTypes(): Promise<IHistoryType[]> {
    const res = await $api.get(`/history-types/for_bases`);
    return res.data;
  }

  static async getProductsHistoryTypes(): Promise<IHistoryType[]> {
    const res = await $api.get(`/history-types/for_products`);
    return res.data;
  }
}
