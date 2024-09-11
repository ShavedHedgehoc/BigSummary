import { $api } from "../http";
import { AxiosResponse } from "axios";
import { IDoc, IRecord, ISummaryUploadData, SummaryResponse } from "../types";

export default class SummaryService {
  static async getRecords(plantId: string): Promise<AxiosResponse<SummaryResponse>> {
    return $api.get(`/docs/${plantId}`);
  }

  static async getDocs(): Promise<AxiosResponse<IDoc[]>> {
    return $api.get(`/docs`);
  }

  static async getDocsById(docId: string): Promise<AxiosResponse<IDoc>> {
    return $api.get(`/docs/doc/${docId}`);
  }

  static bulkCreateRecords(data: ISummaryUploadData) {
    return $api.post(`/records/bulkcreate`, data);
  }

  static getRecordById(recordId: string): Promise<AxiosResponse<IRecord>> {
    return $api.get(`/records/detail/${recordId}`);
  }
}
