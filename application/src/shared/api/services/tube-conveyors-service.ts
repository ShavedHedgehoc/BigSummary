import { $apiTubes } from "../http";

type IState = "idle" | "working" | "finished";

interface IPostData {
  production: number | null;
  state: IState;
  employee: string;
}

interface ITubeConveyorSummary {
  id: number;
  product_id: number;
  product_code: string;
  product_name: string;
  batch_id: number;
  batch_name: string;
  plan: number;

  extrusion: IPostData | null;
  varnish: IPostData | null;
  offset: IPostData | null;
  sealant: IPostData | null;
}

export interface IConveyorData {
  id: number;
  name: string;
  summary: ITubeConveyorSummary | null;
}

export interface ITubeConveyor {
  id: number;
  name: string;
}

export interface IConveyorsDataResponse {
  conveyors: IConveyorData[];
}

export default class TubeConveyorsService {
  static async getConveyorsData(): Promise<IConveyorsDataResponse> {
    const res = await $apiTubes.get(`/conveyors/all_data`);
    return res.data;
  }

  static async getConveyors(): Promise<ITubeConveyor[]> {
    const res = await $apiTubes.get(`/conveyors/all`);
    return res.data;
  }
}
