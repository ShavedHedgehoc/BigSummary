import { $api } from "../http";
import { ApiRoutes } from "./api-routes";

export interface IConveyor {
  id: number;
  name: string;
}

//use-conveyors
export default class ConveyorService {
  static async getConveyorByName(conveyorName: string | null): Promise<IConveyor> {
    const res = await $api.get(`${ApiRoutes.GET_CONVEYOR_BY_NAME}${conveyorName}`);
    return res.data;
  }
}
