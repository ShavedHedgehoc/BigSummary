import axios from "axios";

export interface IDocRow {
  id: number;
  productId: string;
  product: string;
  boil: string;
  plan: number;
  apparatus: string;
  bbf: string;
  note: string;
  can: string;
  conveyor: string;
  workshop: string;
  historiesCount: number;
  state: string;
  stateValue: string;
  stateTime: Date;
  isSet: boolean;
  isUpdated: boolean;
}

export interface SummaryResponse {
  id: number;
  plantId: number;
  plant: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  records: IDocRow[];
}

export default class DocService {
  static async getCurrentRecordsList(plant_id: number | null): Promise<SummaryResponse> {
    const res = await axios.get(`/api/doc_detail/current/${plant_id}`);
    return res.data;
  }

  static async getRecord(record_id: number | null): Promise<IDocRow> {
    const res = await axios.get(`/api/doc_detail/record/${record_id}`);
    return res.data;
  }
}
