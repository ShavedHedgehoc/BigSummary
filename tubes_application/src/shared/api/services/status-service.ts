import { $api } from "../http";
import { ApiRoutes } from "./api-routes";

export interface CreateStatusDto {
  summary_id: number;
  operation_id: number | null;
  idle: boolean;
  finished: boolean;
  employee_id: number;
  defect_value?: string;
}

export interface IStatusResponce {
  id: number;
  summary_id: number;
  operation_id: number | null;
  idle: boolean;
  employee_id: number;
  finished: boolean;
  createdAt: Date;
}

export default class StatusService {
  static async createExtrusionStatus(dto: CreateStatusDto): Promise<IStatusResponce> {
    const res = await $api.post(`${ApiRoutes.CREATE_EXTRUSION_STATUS}`, dto);
    return res.data;
  }
  static async createVarnishStatus(dto: CreateStatusDto): Promise<IStatusResponce> {
    const res = await $api.post(`${ApiRoutes.CREATE_VARNISH_STATUS}`, dto);
    return res.data;
  }

  static async createOffsetStatus(dto: CreateStatusDto): Promise<IStatusResponce> {
    const res = await $api.post(`${ApiRoutes.CREATE_OFFSET_STATUS}`, dto);
    return res.data;
  }

  static async createSealantStatus(dto: CreateStatusDto): Promise<IStatusResponce> {
    const res = await $api.post(`${ApiRoutes.CREATE_SEALANT_STATUS}`, dto);
    return res.data;
  }
}
