import { $api } from "../http";
import { ApiRoutes } from "./api-routes";

export interface IPicture {
  id: number;
  product_id: number;
  src: string;
}

export interface IPictureData {
  pictures: IPicture[] | [];
}

//use-pictures
export default class PicturesService {
  static async getPicturesByProductId(productId: number | null): Promise<IPictureData> {
    const res = await $api.get(`${ApiRoutes.GET_PICTURES}?product_id=${productId}`);
    return res.data;
  }
}
