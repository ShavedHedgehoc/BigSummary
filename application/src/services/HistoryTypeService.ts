import { $api } from "../http";
import { AxiosResponse } from "axios";
import { IHistoryType } from "../types";

export default class HistoryTypeService {
  static async getHistories(): Promise<AxiosResponse<IHistoryType[]>> {
    return $api.get(`/history-types`);
  }
}
