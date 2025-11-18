import { $api } from "../http";
import { ApiRoutes } from "./api-routes";
import type { IExtrusionParam, IExtrusionTreshold } from "./extrusion-service";

export interface IBatch {
  id: number;
  name: string;
}

export interface IProduction {
  id: number;
  code: string;
  marking: string;
  name: string;
}

export interface IProductionWTresholds {
  id: number;
  code: string;
  marking: string;
  name: string;
  extrusion_tresholds: IExtrusionTreshold[];
}

export interface ISummary {
  id: number;
  production_id: number;
  batch_id: number;
  conveyor_id: number;
  plan: number;
  isActive: boolean;
  isFinished: boolean;
  batch: IBatch;
  production: IProductionWTresholds;
  extrusion_params: IExtrusionParam[];
  chief_notes: IChiefNote[];
}

export interface ISummaryCounters {
  id: number;
  production_id: number;
  batch_id: number;
  conveyor_id: number;
  plan: number;
  isActive: boolean;
  isFinished: boolean;
  batch: IBatch;
  production: IProduction;
  extrusion_params: Partial<IExtrusionParam> & Pick<IExtrusionParam, "createdAt" | "counter_value">;
}

export interface IChiefNote {
  id: number;
  summary_id: number;
  post_id: number;
  note: string;
}

export default class SummaryService {
  static async getActiveSummary(conveyor_id: number | null): Promise<ISummary> {
    const res = await $api.get(`${ApiRoutes.GET_ACTIVE_SUMMARY_NEW}/${conveyor_id}`);
    return res.data;
  }

  static async getActiveSummaryRecordByConveyorId(conveyor_id: number | null): Promise<ISummary> {
    const res = await $api.get(`${ApiRoutes.GET_ACTIVE_SUMMARY}/${conveyor_id}`);
    return res.data;
  }

  static async getActiveSummaryCountersBySummaryId(summary_id: number | null): Promise<ISummary> {
    const res = await $api.get(`${ApiRoutes.GET_ACTIVE_SUMMARY_COUNTERS}/${summary_id}`);
    return res.data;
  }
}
