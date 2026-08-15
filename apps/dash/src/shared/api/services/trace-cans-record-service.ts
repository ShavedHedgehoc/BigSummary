import axios from "axios";

export interface ITraceCanRecord {
  CreateDate: Date;
  stateDescription: string;
  authorName: string;
  baseContain: string | null;
}

export default class TraceCanRecordService {
  static async getLastTenRecords(canId: number | null): Promise<ITraceCanRecord[]> {
    const res = await axios.get(`/api/trace-can-records/last_ten/${canId}`);
    return res.data;
  }
}
