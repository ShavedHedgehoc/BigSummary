import { $api } from "../http";
import { AxiosResponse } from "axios";
import { IBoilsListItem } from "../types";

export default class BoilService {
  static async getBoilsList(): Promise<AxiosResponse<IBoilsListItem[]>> {
    return $api.get(`/boils_list`);
  }
  static getUpdatedBoilRow(boilId: string): Promise<AxiosResponse<IBoilsListItem>> {
    return $api.get(`/boils_list/boil/${boilId}`);
  }
}
