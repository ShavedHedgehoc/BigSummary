import { $api } from "../http";
import { AxiosResponse } from "axios";
import { IHistory } from "../types";

export interface HistoryCreateDto {
  boil: string;
  code: string | null;
  historyType: string;
  userId: number | null;
  employeeId: number | null;
  note: string | null;
}

export interface HistoryCreateDirectDto {
  record_id: number | null;
  historyType: string | null;
  boil_value: string | null;
  userId: number | null;
  employeeId: number | null;
  note: string | null;
}

export interface AddHistoryDtoNew {
  record_id: number;
  boil_value: string;
  userId: number;
  employeeId: number;
  note: string;
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
export interface AddHistoryDto {
  record_id: number | null;
  historyType: string | null;
  boil_value: string | null;
  userId: number | null;
  employeeId: number | null;
  note: string | null;
}

export default class HistoryService {
  static async createHistory(data: AddHistoryDto): Promise<AxiosResponse<HistoryCreateResponce>> {
    return $api.post(`/histories`, data);
  }
  static async createHistoryDirect(data: AddHistoryDto): Promise<AxiosResponse<HistoryCreateResponce>> {
    return $api.post(`/histories/direct`, data);
  }

  static async createHistoryBaseCheck(data: AddHistoryDto): Promise<AxiosResponse<HistoryCreateResponce>> {
    return $api.post(`/histories/base_check`, data);
  }
  static async deleteHistory(id: number): Promise<AxiosResponse> {
    return $api.delete(`/histories/${id}`);
  }
  static async getHistoriesByRecordId(id: string): Promise<AxiosResponse<IHistory[]>> {
    return $api.get(`/histories/all/${id}`);
  }
}
