import axios from "axios";

interface SemiProduct {
  code: string;
  marking: string;
  boil_value: string;
}

interface Regulation {
  org_base_min_weight: string;
  org_base_max_weight: string;
  water_base_min_weight: string;
  water_base_max_weight: string;
  per_box: number;
  box_per_row: number;
  row_on_pallet: number;
  gasket: string;
  seal: boolean;
  technician_note: string | null;
  packaging_note: string | null;
  inc_color: string | null;
  marking_feature: string | null;
  marking_sample_value: string | null;
}

export interface RecordDetail {
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
  semiProducts: SemiProduct[] | [];
  regulation: Regulation;
}

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

  static async getRecord(record_id: number | null): Promise<RecordDetail> {
    const res = await axios.get(`/api/doc_detail/record/${record_id}`);
    return res.data;
  }
}
