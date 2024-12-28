import { $api } from "../http";

export interface BoilHistoriesResponse {
  histories: IHistory[];
}

export default class BoilService {
  static async getHistoriesByBoilId(boil_id: number | null): Promise<IHistory[]> {
    const res = await $api.get(`/histories/boil/${boil_id}`);
    return res.data;
  }

  static async getBoilsListWithParams(dto: FetchBoilsDto): Promise<IBoilData> {
    const res = await $api.post(`/boils_list`, dto);
    return res.data;
  }
}
