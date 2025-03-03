import axios from "axios";

export interface ITracePlant {
  PlantPK: number;
  PlantName: string;
  PlantAlias: string;
}

export default class TracePlantService {
  static async getAllPlants(): Promise<ITracePlant[]> {
    const res = await axios.get(`/api/trace-plants`);
    return res.data;
  }
}
