import { AxiosResponse } from "axios";
import { $api } from "../http";
import { ApiRoutes } from "../consts/apiRoutes";
import { IPlant } from "../types/plant";

export default class PlantService {
  static async getPlants(): Promise<AxiosResponse<IPlant[]>> {
    return $api.get(ApiRoutes.PLANTS);
  }
}
