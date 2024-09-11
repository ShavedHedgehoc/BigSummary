import { $api } from "../http";
import { AxiosResponse } from "axios";
import { IPlant } from "../types";

export default class PlantService {
  static async getPlants(): Promise<AxiosResponse<IPlant[]>> {
    return $api.get(`/plants`);
  }
}
