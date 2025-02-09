import { $api } from "../http";
import { AxiosResponse } from "axios";
// import { IPlant } from "../types";

export interface IPlant {
  id: number;
  value: string;
  abb: string;
}

export default class PlantService {
  //remove after remove mobx
  static async getPlants(): Promise<AxiosResponse<IPlant[]>> {
    return $api.get(`/plants`);
  }

  static async getAllPlants(): Promise<IPlant[]> {
    const res = await $api.get(`/plants`);
    return res.data;
  }
}
