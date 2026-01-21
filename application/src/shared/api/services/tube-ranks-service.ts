import { $apiTubes } from "../http";

export interface IRank {
  id: number;
  val: number;
  description: string;
}
export interface RanksResponse {
  ranks: IRank[] | [];
}

export default class TubeRanksService {
  static async getRanks(): Promise<RanksResponse> {
    const res = await $apiTubes.get(`/ranks`);
    return res.data;
  }
}
