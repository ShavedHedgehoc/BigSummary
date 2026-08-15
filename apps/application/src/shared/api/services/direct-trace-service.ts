import { $api } from "../http";
export interface IXLSBoilsRowRow {
  productid: string;
  productname: string;
  quantity: string;
}

export interface IXLSBoilsAttrs {
  apparatus: string;
  batch: string;
  date: string;
  fin_productid: string;
  marking: string;
  plan: string;
  plant: string;
}

export interface IXLSBoilsBatchRecord {
  _attributes: IXLSBoilsAttrs;
  row: IXLSBoilsRowRow[];
}

export interface IXLSBoilsDocument {
  batch_record: IXLSBoilsBatchRecord;
}

export interface IXLSBoilsRowData {
  document: IXLSBoilsDocument;
}

export interface IBoilsUploadResponse {
  value: number;
}

export default class DirectTraceService {
  static async uploadBoil(dto: IXLSBoilsRowData): Promise<IBoilsUploadResponse> {
    const res = await $api.post(`/trace-direct-connection`, dto);
    return res.data;
  }
}
