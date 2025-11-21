import { $api } from "../http";
import { ApiRoutes } from "./api-routes";

export interface IRondel {
  id: number;
  value: string;
}

export interface IRondelData {
  rondels: IRondel[] | [];
}

export default class RondelService {
  static async getRondels(): Promise<IRondelData> {
    const res = await $api.get(ApiRoutes.GET_RONDELS);
    return res.data;
  }
}
