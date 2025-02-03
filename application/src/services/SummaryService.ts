import { $api } from "../shared/api/http";
import { AxiosResponse } from "axios";
import { IDoc, IHistory, IRecordDetailRecord, ISummaryUploadData, SummaryResponse } from "../types";

export interface RecordDetailResponse extends IRecordDetailRecord {
  histories: IHistory[];
}

export default class SummaryService {
  // Get records from today summary
  static async getRecords(plantId: string): Promise<AxiosResponse<SummaryResponse>> {
    return $api.get(`/doc_detail/current/${plantId}`);
  }

  static async getCurrentRecordsData(dto: FetchProductsDto): Promise<SummaryResponse> {
    // const res = await $api.get(`/doc_detail/current/${dto.plant}`);
    // const res = await $api.post(`/doc_detail/current/${dto.filter.plant}`, dto);
    const res = await $api.post(`/doc_detail/`, dto);
    return res.data;
  }

  static async getRecordsByDocId(docId: string): Promise<AxiosResponse<SummaryResponse>> {
    return $api.get(`/doc_detail/${docId}`);
  }

  static async getDocs(): Promise<AxiosResponse<IDoc[]>> {
    return $api.get(`/docs_list`);
  }

  static async deleteDoc(id: number): Promise<AxiosResponse<any>> {
    return $api.delete(`/docs/${id}`);
  }

  static bulkCreateRecords(data: ISummaryUploadData) {
    return $api.post(`/records/bulkcreate`, data);
  }
  ///////////////////////////
  // static getRecordById(recordId: string): Promise<AxiosResponse<IDocRow>> {
  //   // return $api.get(`/records/detail/${recordId}`);
  //   return $api.get(`/test/${recordId}`);
  // }

  // static getUpdatedDocRow(recordId: string): Promise<AxiosResponse<IDocRow>> {
  //   return $api.get(`/doc_detail/record/${recordId}`);
  // }

  static getRecordDetailById(recordId: string): Promise<AxiosResponse<RecordDetailResponse>> {
    // return $api.get(`/records/detail/${recordId}`);
    return $api.get(`/record_detail/${recordId}`);
  }
}
