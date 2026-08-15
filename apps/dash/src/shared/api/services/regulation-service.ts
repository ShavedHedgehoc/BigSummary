import axios from "axios";

export interface RegulationResponce {
  id: number;
  product_id: number;
  water_base_min_weight: string;
  water_base_max_weight: string;
  per_box: number;
  box_per_row: number;
  row_on_pallet: number;
  gasket: string;
  seal: boolean;
  technician_note: string | null;
  packaging_note: string | null;
  marking_sample_id: number;
  marking_sample_value: string | null;
}

export default class RegulationService {
  static async getRegulationByProductId(id: string | null): Promise<RegulationResponce> {
    const res = await axios.get(`/api/regulations/${id}`);
    return res.data;
  }
}
