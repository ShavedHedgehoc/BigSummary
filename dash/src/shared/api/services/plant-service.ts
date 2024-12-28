import axios from "axios";

export interface IPlant {
  id: number;
  value: string;
}

export default class PlantService {
  static async getPlantByName(plant_name: string | null): Promise<IPlant> {
    const res = await axios.get(`/api/plants/${plant_name}`);
    return res.data;
  }
}
