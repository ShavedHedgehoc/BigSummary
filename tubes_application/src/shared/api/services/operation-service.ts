import { $api } from "../http";
import { ApiRoutes } from "./api-routes";

export interface IOperation {
  id: number;
  value: string;
  description: string;
  min_rank: number;
}

export default class OperationService {
  static async getExtrusionOperationById(id: string | null): Promise<IOperation[]> {
    const res = await $api.get(`${ApiRoutes.GET_EXTRUSION_OPERATIONS}?id=${id}`);
    return res.data;
  }

  static async getVarnishOperationById(id: string | null): Promise<IOperation[]> {
    const res = await $api.get(`${ApiRoutes.GET_VARNISH_OPERATIONS}?id=${id}`);
    return res.data;
  }
  static async getOffsetOperationById(id: string | null): Promise<IOperation[]> {
    const res = await $api.get(`${ApiRoutes.GET_OFFSET_OPERATIONS}?id=${id}`);
    return res.data;
  }
  static async getSealantOperationById(id: string | null): Promise<IOperation[]> {
    const res = await $api.get(`${ApiRoutes.GET_SEALANT_OPERATIONS}?id=${id}`);
    return res.data;
  }
}
