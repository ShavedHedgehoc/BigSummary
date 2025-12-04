import { $api } from "../http";
import { ApiRoutes } from "./api-routes";

export interface IOperation {
  id: number;
  value: string;
  description: string;
  min_rank: number;
}

// remove
export default class OperationService {
  static async getExtrusionOperations(rank: number | null): Promise<IOperation[]> {
    const res = await $api.get(`${ApiRoutes.GET_EXTRUSION_OPERATIONS}?rank=${rank}`);
    return res.data;
  }
  static async getVarnishOperations(rank: number | null): Promise<IOperation[]> {
    const res = await $api.get(`${ApiRoutes.GET_VARNISH_OPERATIONS}?rank=${rank}`);
    return res.data;
  }

  static async getOffsetOperations(rank: number | null): Promise<IOperation[]> {
    const res = await $api.get(`${ApiRoutes.GET_OFFSET_OPERATIONS}?rank=${rank}`);
    return res.data;
  }

  static async getSealantOperations(rank: number | null): Promise<IOperation[]> {
    const res = await $api.get(`${ApiRoutes.GET_SEALANT_OPERATIONS}?rank=${rank}`);
    return res.data;
  }
}
