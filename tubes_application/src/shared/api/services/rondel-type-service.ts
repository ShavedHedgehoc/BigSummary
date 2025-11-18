import { $api } from "../http";
import { ApiRoutes } from "./api-routes";

export interface IRondelType {
  id: number;
  value: string;
}

export default class RondelTypeService {
  static async getAllRondelTypes(): Promise<IRondelType[] | []> {
    const res = await $api.get(ApiRoutes.GET_RONDEL_TYPES);
    return res.data;
  }
}
