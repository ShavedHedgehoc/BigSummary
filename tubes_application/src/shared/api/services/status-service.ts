import { $api } from "../http";
import { ApiRoutes } from "./api-routes";

export interface CreateStatusDto {
  summary_id: number;
  operation_id: number | null;
  idle: boolean;
  finished: boolean;
  employee_id: number;
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

  //   static async createVarnishEntry(dto: CreateVarnishEntryDto): Promise<any> {
  //     const res = await $api.post(`${ApiRoutes.CREATE_VARNISH_ENTRY}`, dto);
  //     return res.data;
  //   }
  //   static async createOffsetEntry(dto: CreateOffsetEntryDto): Promise<any> {
  //     const res = await $api.post(`${ApiRoutes.CREATE_OFFSET_ENTRY}`, dto);
  //     return res.data;
  //   }

  //   static async createSealantEntry(dto: CreateSealantEntryDto): Promise<any> {
  //     const res = await $api.post(`${ApiRoutes.CREATE_SEALANT_ENTRY}`, dto);
  //     return res.data;
  //   }
}
