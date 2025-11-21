import { $api } from "../http";
import { ApiRoutes } from "./api-routes";

export interface IProduct {
  id: number;
  code: string;
  marking: string;
  name: string;
}

//use-products
export default class ProductService {
  static async getProductById(productId: string | null): Promise<IProduct> {
    const res = await $api.get(`${ApiRoutes.GET_PRODUCT_BY_ID}/${productId}`);
    return res.data;
  }
}
