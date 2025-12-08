import { $apiTubes } from "../http";

interface ITubeBatch {
  id: number;
  name: string;
}

interface ITubeSummary {
  id: number;
  product_id: number;
  batch_id: number;
  conveyor_id: number;
  plan: number;
  isActive: boolean;
  isFinished: boolean;
  date: Date;
  batch: ITubeBatch;
  //   product: {
  //     id: 1;
  //     code: "002676";
  //     marking: "D28xL129_Only Looks";
  //     name: "Туба LOOKS 50 мл D 28 мм металлическая";
  //   };
  //   extrusion_statuses: [];
}

export interface IConveyor {
  id: number;
  name: string;
  summaries: ITubeSummary[] | [];
}

export interface IConveyorsDataResponse {
  conveyors: IConveyor[];
}

export default class TubeConveyorsService {
  static async getconveyorsData(): Promise<IConveyorsDataResponse> {
    const res = await $apiTubes.get(`/conveyors/all_data`);
    return res.data;
  }
}
