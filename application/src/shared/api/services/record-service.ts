import { $api } from "../http";
// import { IHistory } from "../../../types";

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

  static async getRecordsByDocId(dto: FetchProductsWithDocIdDto): Promise<SummaryResponse> {
    const res = await $api.post(`/doc_detail/by_id/`, dto);
    return res.data;
  }

  static async deleteRecord(record_id: number): Promise<any> {
    const res = await $api.delete(`/records/${record_id}`);
    return res.data;
  }

  static async updateRecord(dto: UpdateRecordDto): Promise<IDocRow> {
    const res = await $api.put(`/records/`, dto);
    return res.data;
  }

  static async bulkCreateRecords(dto: ISummaryUploadData) {
    const res = await $api.post(`/records/upload_doc`, dto);
    return res.data;
  }
}
