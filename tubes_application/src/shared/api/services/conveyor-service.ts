import { $api } from "../http";
import { ApiRoutes } from "./api-routes";

export interface IConveyor {
  id: number;
  name: string;
}

export default class ConveyorService {
  static async getConveyorByName(conveyorName: string | null): Promise<IConveyor> {
    const res = await $api.get(`${ApiRoutes.GET_CONVEYORS}/${conveyorName}`);
    return res.data;
  }
}
