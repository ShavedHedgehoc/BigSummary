import { $api } from "../http";
import { ApiRoutes } from "./api-routes";

export interface IConveyor {
  id: number;
  name: string;
}

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

export interface IConveyor {
  id: number;
  name: string;
  summary: ITubeConveyorSummary | null;
}

export interface IConveyorsDataResponse {
  conveyors: IConveyor[];
}

//use-conveyors
export default class ConveyorService {
  static async getConveyorByName(conveyorName: string | null): Promise<IConveyor> {
    const res = await $api.get(`${ApiRoutes.GET_CONVEYOR_BY_NAME}${conveyorName}`);
    return res.data;
  }
  static async getAllConveyors(): Promise<IConveyor[] | []> {
    const res = await $api.get(ApiRoutes.GET_CONVEYORS);
    return res.data;
  }

  static async getConveyorsData(): Promise<IConveyorsDataResponse> {
    const res = await $api.get(ApiRoutes.GET_CONVEYORS_DATA);
    return res.data;
  }
}
