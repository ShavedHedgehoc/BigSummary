import { $api } from "../http";
import { AxiosResponse } from "axios";

export interface HistoryCreateDto {
  boil: string;
  code: string | null;
  historyType: string;
  userId: number | null;
  employeeId: number | null;
  note: string | null;
}

export interface HistoryCreateResponce {
  id: number;
  userId: number | null;
  employeeId: number | null;
  note: string;
  recordId: number;
  historyTypeId: number;
  updatedAt: Date;
  createdAt: Date;
}

export default class HistoryService {
  static async createHistory(data: HistoryCreateDto): Promise<AxiosResponse<HistoryCreateResponce>> {
    return $api.post(`/histories`, data);
  }
}