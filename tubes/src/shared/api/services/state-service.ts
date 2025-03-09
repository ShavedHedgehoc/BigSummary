import axios from "axios";

export interface ITracePlant {
  PlantPK: number;
  PlantName: string;
  PlantAlias: string;
}

export default class StatetService {
  static async getAllPlants(): Promise<ITracePlant[]> {
    const res = await axios.get(`/api/`);
    return res.data;
  }
}
