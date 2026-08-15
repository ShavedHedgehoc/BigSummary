import { $api } from "../http";

export interface ITracePlant {
  PlantPK: number;
  PlantName: string;
  PlantAlias: string;
}

export default class TracePlantsService {
  static async getAllPlants(): Promise<ITracePlant[]> {
    const res = await $api.get(`trace-plants`);
    return res.data;
  }
}
