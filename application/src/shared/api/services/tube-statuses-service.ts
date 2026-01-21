import { $apiTubes } from "../http";

export interface CreateTubeStatusDto {
  summary_id: number;
  operation_id: number | null;
  idle: boolean;
  finished: boolean;
  employee_id: number | null;
  defect_value?: string;
}

export interface ITubeStatusResponce {
  id: number;
  summary_id: number;
  operation_id: number | null;
  idle: boolean;
  employee_id: number;
  finished: boolean;
  createdAt: Date;
}
export default class TubeStatusesService {
  static async createExtrusionStatus(dto: CreateTubeStatusDto): Promise<ITubeStatusResponce> {
    const res = await $apiTubes.post(`/statuses/extrusion`, dto);
    return res.data;
  }
  static async createVarnishStatus(dto: CreateTubeStatusDto): Promise<ITubeStatusResponce> {
    const res = await $apiTubes.post(`/statuses/varnish`, dto);
    return res.data;
  }

  static async createOffsetStatus(dto: CreateTubeStatusDto): Promise<ITubeStatusResponce> {
    const res = await $apiTubes.post(`/statuses/offset`, dto);
    return res.data;
  }

  static async createSealantStatus(dto: CreateTubeStatusDto): Promise<ITubeStatusResponce> {
    const res = await $apiTubes.post(`/statuses/sealant`, dto);
    return res.data;
  }
}
