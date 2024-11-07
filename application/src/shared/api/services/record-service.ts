import { $api } from "../http";
import { IHistory, IRecordDetailRecord } from "../../../types";

export interface RecordHistoriesResponse {
  histories: IHistory[];
}

export default class RecordService {
  static async getHistoriesByRecordId(record_id: number | null): Promise<RecordHistoriesResponse> {
    const res = await $api.get(`/record_detail/${record_id}`);
    return res.data;
  }
  static async getCurrentRecordsList(dto: FetchProductsDto): Promise<SummaryResponse> {
    const res = await $api.post(`/doc_detail/`, dto);
    return res.data;
  }
}
