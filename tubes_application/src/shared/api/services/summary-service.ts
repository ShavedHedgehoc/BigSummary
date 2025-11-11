import { $api } from "../http";

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

export interface ISummary {
  id: number;
  production_id: number;
  batch_id: number;
  conveyor_id: number;
  plan: number;
  isActive: boolean;
  isFinishe: boolean;
  batch: IBatch;
  production: IProduction;
}

export default class SummaryService {
  static async getActiveSummaryRecordByConveyorId(conveyor_id: number | null): Promise<ISummary> {
    const res = await $api.get(`/summaries/active/${conveyor_id}`);
    return res.data;
  }
}
