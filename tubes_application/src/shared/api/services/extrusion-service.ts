import { $api } from "../http";
import { ApiRoutes } from "./api-routes";

interface IRondelType {
  id: number;
  value: string;
}

export interface IExtrusionTreshold {
  id: number;
  production_id: number;
  press_speed_min: number;
  press_speed_max: number;
  blow_time_min: number;
  blow_time_max: number;
  turning_machine_speed_min: number;
  turning_machine_speed_max: number;
  annealing_furnace_temp_min: number;
  annealing_furnace_temp_max: number;
  rondel_type_id: number;
  rondel_type: IRondelType;
}

export interface IExtrusionParams {
  id: number;
  summary_id: number;
  press_speed: number;
  blow_time: number;
  turning_machine_speed: number;
  annealing_furnace_temp: number;
  employee_id: number;
  createdAt: Date;
  rondel_type_id: number;
  rondel_type: IRondelType;
}

export default class ExtrusionService {
  static async getTresholdsByProductId(product_id: number | null): Promise<IExtrusionTreshold> {
    const res = await $api.get(`${ApiRoutes.GET_EXTRUSION_TRESHOLDS}/${product_id}`);
    return res.data;
  }

  static async getCurrentParamsBySummaryId(summary_id: number | null): Promise<IExtrusionParams> {
    const res = await $api.get(`${ApiRoutes.GET_EXTRUSION_CURRENT_PARAMS}/${summary_id}`);
    return res.data;
  }
}
