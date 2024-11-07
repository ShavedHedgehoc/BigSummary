import { $api } from "../shared/api/http";
import { AxiosResponse } from "axios";
import { IHistoryType } from "../types";

export default class HistoryTypeService {
  static async getHistoryTypes(): Promise<AxiosResponse<IHistoryType[]>> {
    return $api.get(`/history-types`);
  }

  static async getHistoryTypesForBases(): Promise<AxiosResponse<IHistoryType[]>> {
    return $api.get(`/history-types/for_bases`);
  }
}
