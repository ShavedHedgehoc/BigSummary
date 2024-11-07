import { $api } from "../shared/api/http";
import { AxiosResponse } from "axios";
import { IBoilParams, IBoilsListItem } from "../types";
import { IBoilData, IBoilRow } from "../store/BoilStore";

export default class BoilService {
  static async getBoilsList(): Promise<AxiosResponse<IBoilsListItem[]>> {
    return $api.get(`/boils_list`);
  }

  static async getBoilsListWithParams(dto: IBoilParams): Promise<AxiosResponse<IBoilData>> {
    return $api.post(`/boils_list`, dto);
  }
  static getUpdatedBoilRow(boilId: string): Promise<AxiosResponse<IBoilRow>> {
    return $api.get(`/boils_list/boil/${boilId}`);
  }
}
