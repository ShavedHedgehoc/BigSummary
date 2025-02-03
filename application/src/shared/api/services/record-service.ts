import { $api } from "../http";

export interface RecordHistoriesResponse {
  histories: IHistory[];
}

export interface IXLSDocsRowData {
  code1C: string;
  product: string;
  serie: string;
  batch: string;
  apparatus: string;
  can: string;
  plan: string;
  bbf: string;
  note: string;
  workshop: string;
  boil1: string;
  boil2: string;
  semi_product: string;
  org_base_min_weight: string;
  org_base_max_weight: string;
  water_base_min_weight: string;
  water_base_max_weight: string;
  per_box: string;
  box_per_row: string;
  row_on_pallet: string;
  gasket: string;
  seal: string;
  technician_note: string;
  packaging_note: string;
  marking_sample: string;
  marking_feature: string;
  ink_color: string;
}

export interface IDocUploadData {
  plantId: string;
  summaryDate: string;
  update: boolean;
  rows: IXLSDocsRowData[];
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

  static async bulkCreateRecords(dto: IDocUploadData) {
    const res = await $api.post(`/records/upload_doc`, dto);
    return res.data;
  }
}
