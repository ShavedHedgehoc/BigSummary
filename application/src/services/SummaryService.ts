import { $api } from "../http";
import { AxiosResponse } from "axios";
import { IDoc, IDocRow, IHistory, IRecordDetailRecord, ISummaryUploadData, SummaryResponse } from "../types";

export interface RecordDetailResponse extends IRecordDetailRecord {
  histories: IHistory[];
}

export default class SummaryService {
  // Get records from today summary
  static async getRecords(plantId: string): Promise<AxiosResponse<SummaryResponse>> {
    return $api.get(`/doc_detail/current/${plantId}`);
  }

  static async getRecordsByDocId(docId: string): Promise<AxiosResponse<SummaryResponse>> {
    return $api.get(`/doc_detail/${docId}`);
  }

  static async getDocs(): Promise<AxiosResponse<IDoc[]>> {
    return $api.get(`/docs_list`);
  }

  static bulkCreateRecords(data: ISummaryUploadData) {
    return $api.post(`/records/bulkcreate`, data);
  }
  ///////////////////////////
  // static getRecordById(recordId: string): Promise<AxiosResponse<IDocRow>> {
  //   // return $api.get(`/records/detail/${recordId}`);
  //   return $api.get(`/test/${recordId}`);
  // }

  static getUpdatedDocRow(recordId: string): Promise<AxiosResponse<IDocRow>> {
    return $api.get(`/doc_detail/record/${recordId}`);
  }

  static getRecordDetailById(recordId: string): Promise<AxiosResponse<RecordDetailResponse>> {
    // return $api.get(`/records/detail/${recordId}`);
    return $api.get(`/record_detail/${recordId}`);
  }
}
