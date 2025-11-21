import { $api } from "../http";
import { ApiRoutes } from "./api-routes";

export interface CreateConsumedMaterialDto {
  summary_id: number;
  employee_id: number;
  post_id: number;
  code: string;
  lot: string;
}

export default class ConsumedMaterialService {
  static async createConsumedMaterial(dto: CreateConsumedMaterialDto | null): Promise<any> {
    const res = await $api.post(ApiRoutes.CREATE_CONSUMED_MATERIAL, dto);
    return res.data;
  }
}
