import { $api } from "../http";
import { ApiRoutes } from "./api-routes";

export interface GetSummaryRawMaterialsBySummaryId {
  summary_id: number;
  post_id: number;
}

export interface IRawMaterialCurrent {
  id: number;
  summary_id: number;
  raw_material_id: number;
  lot: string;
  employee_id: number;
  createdAt: Date;
}

export interface IRawMaterial {
  id: number;
  code: string;
  name: string;
  post_number: number;
  raw_materials_current_records: IRawMaterialCurrent[];
}

export interface ISummaryRawMaterial {
  id: number;
  summary_id: number;
  raw_material_id: number;
  raw_material: IRawMaterial;
}

export default class SummaryRawMaterialsService {
  static async getSummaryRawMaterialsBySummaryId(
    dto: GetSummaryRawMaterialsBySummaryId | null
  ): Promise<ISummaryRawMaterial[]> {
    const res = await $api.post(ApiRoutes.GET_SUMMARY_RAW_MATERIALS_BY_SUMMARY_ID, dto);
    return res.data;
  }
}
