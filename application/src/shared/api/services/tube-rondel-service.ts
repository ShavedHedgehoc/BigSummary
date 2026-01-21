import { $apiTubes } from "../http";

export interface ITubeRondel {
  id: number;
  value: string;
}

export interface ITubeRondelData {
  rondels: ITubeRondel[] | [];
}

export default class TubeRondelService {
  static async getRondels(): Promise<ITubeRondelData> {
    const res = await $apiTubes.get("/rondels");
    return res.data;
  }
}
