import axios from "axios";

export interface LastHistoryResponse {
  value: string;
  description: string;
}

export interface CreateTubeHistoryDto {
  history_type: string;
  record_id: number;
  employee_id: number;
}

export default class HistoryService {
  static async getLastHistoryByConveyorName(conveyorName: string): Promise<LastHistoryResponse> {
    const res = await axios({
      method: "post",
      url: `/api/tube-histories/last_history`,
      headers: {},
      data: {
        conveyor_name: conveyorName,
      },
    });
    return res.data;
  }

  static async createHistore(dto: CreateTubeHistoryDto): Promise<LastHistoryResponse> {
    const res = await axios({
      method: "post",
      url: `/api/tube-histories/create`,
      headers: {},
      data: { ...dto },
    });
    return res.data;
  }
}
