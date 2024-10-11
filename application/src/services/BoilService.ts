import { $api } from "../http";
import { AxiosResponse } from "axios";
import { IBoilParams, IBoilsListItem } from "../types";
import { IBoilData } from "../store/BoilStore";

export default class BoilService {
  static async getBoilsList(): Promise<AxiosResponse<IBoilsListItem[]>> {
    return $api.get(`/boils_list`);
  }

  static async getBoilsListWithParams(dto: IBoilParams): Promise<AxiosResponse<IBoilData>> {
    return $api.post(`/boils_list`, dto);
  }
  static getUpdatedBoilRow(boilId: string): Promise<AxiosResponse<IBoilsListItem>> {
    return $api.get(`/boils_list/boil/${boilId}`);
  }
}
