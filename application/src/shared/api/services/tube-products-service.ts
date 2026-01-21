import { $apiTubes } from "../http";

export interface ITubeProduct {
  id: number;
  code: string;
  marking: string;
  name: string;
}
export interface ProductsResponse {
  products: ITubeProduct[] | [];
}

export default class TubeProductsService {
  static async getProducts(): Promise<ProductsResponse> {
    const res = await $apiTubes.get(`/products`);
    return res.data;
  }
}
