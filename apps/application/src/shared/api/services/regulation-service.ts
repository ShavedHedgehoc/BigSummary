import { $api } from "../http";

export interface UpsertRegulationDto {
  code: string;
  serie: string;
  marking: string;
  name: string;
  water_base_min_weight: number;
  water_base_max_weight: number;
  per_box: number;
  box_per_row: number;
  row_on_pallet: number;
  gasket: string;
  seal: boolean;
  technician_note: string;
  packaging_note: string;
  marking_sample: string;
}

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
    const res = await $api.get(`/regulations/${id}`);
    return res.data;
  }

  static async bulkUpdateRegulations(dto: UpsertRegulationDto[]): Promise<any> {
    const res = await $api.post(`/regulations/bulkupsert`, dto);
    return res.data;
  }
}
