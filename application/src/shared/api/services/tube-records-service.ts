// import { $api } from "../http";

import { $apiTubes } from "../http";

export interface IXLSXTubeRecordRowData {
  code1C: string;
  product_marking: string;
  batch: string;
  plan: string;
  conveyor: string;
  specification: string;
}

export interface ITubeRecordsUploadData {
  summaryDate: string;
  update: boolean;
  rows: IXLSXTubeRecordRowData[];
}

export default class TubeRecordsService {
  static async bulkCreateTubeRecords(dto: ITubeRecordsUploadData) {
    const res = await $apiTubes.post(`/summaries`, dto);
    return res.data;
  }
}
