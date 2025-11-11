import { $api } from "../http";
import { ApiRoutes } from "./api-routes";
import type { IEmployee } from "./employee-service";
import type { IRawMaterial } from "./summary-raw-materials-service";

export interface GetSummaryRawMaterialCurrentDto {
  summary_id: number;
  post_id: number;
  page: number;
  limit: number;
}

export interface CreateSummaryRawMaterialsCurrentRecordDto {
  summary_id: number;
  employee_id: number;
  code: string;
  lot: string;
}

export interface IRawMaterialCurrent {
  id: number;
  summary_id: number;
  raw_material_id: number;
  lot: string;
  employee_id: number;
  createdAt: Date;
}

export interface IRawMaterialCurrentWithEmploeeAndMaterial {
  id: number;
  summary_id: number;
  raw_material_id: number;
  lot: string;
  employee_id: number;
  createdAt: Date;
  employee: IEmployee;
  raw_material: IRawMaterial;
}

export default class SummaryRawMaterialsCurrentService {
  static async createSummaryRawMaterialsCurrentRecord(
    dto: CreateSummaryRawMaterialsCurrentRecordDto | null
  ): Promise<IRawMaterialCurrent> {
    const res = await $api.post(ApiRoutes.CREATE_SUMMARY_RAW_MATERIALS_CURRENT, dto);
    return res.data;
  }

  static async getCurrentRawMaterialsBySummaryIdAndPostId(
    dto: GetSummaryRawMaterialCurrentDto | null
  ): Promise<IRawMaterialCurrentWithEmploeeAndMaterial[]> {
    const res = await $api.post(ApiRoutes.GET_SUMMARY_RAW_MATERIALS_CURRENT, dto);
    return res.data;
  }
}
