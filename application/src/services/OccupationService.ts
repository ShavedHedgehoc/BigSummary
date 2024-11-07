import { $api } from "../shared/api/http";

export interface IOccupation {
  id: number;
  value: string;
  description: string;
}

export default class OccupationService {
  static async getOccupation(): Promise<IOccupation[]> {
    const res = await $api.get(`/occupations`);
    return res.data;
  }
}
