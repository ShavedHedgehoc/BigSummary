import { $api } from "../http";
import { AxiosResponse } from "axios";

export interface IPlant {
  id: number;
  value: string;
}

export default class PlantService {
  static async getPlants(): Promise<AxiosResponse<IPlant[]>> {
    return $api.get(`/plants`);
  }
}
