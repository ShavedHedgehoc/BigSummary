import { $api } from "../http";
import { ApiRoutes } from "./api-routes";
import type { IEmployee } from "./employee-service";
import type { ILaboratoryAssistant } from "./laboratory-assistant-service";

interface IRondelType {
  id: number;
  value: string;
}

export interface IExtrusionHardwareTreshold {
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

export interface IExtrusionHardwareParams {
  id: number;
  summary_id: number;
  counter_value: number;
  press_speed: number;
  blow_time: number;
  turning_machine_speed: number;
  annealing_furnace_temp: number;
  employee_id: number;
  createdAt: Date;
  rondel_type_id: number;
  rondel_type: IRondelType;
  employee: IEmployee;
}

export interface CreateExtrusionHardwareParamsRecordDto {
  summary_id: number;
  counter_value: number;
  press_speed: number;
  blow_time: number;
  turning_machine_speed: number;
  annealing_furnace_temp: number;
  employee_id: number;
  rondel_type_id: number;
}

export interface ICreatedExtrusionHardwareParams {
  id: number;
  summary_id: number;
  counter_value: number;
  press_speed: number;
  blow_time: number;
  turning_machine_speed: number;
  annealing_furnace_temp: number;
  employee_id: number;
  createdAt: Date;
  rondel_type_id: number;
}

// export interface IExtrusionQualityTreshold {}

export interface IExtrusionQualityParams {
  id: number;
  summary_id: number;
  tube_cilindrical_section_length: number;
  membrane_thickness: number;
  tube_diameter: number;
  tube_cilindrical_section_thickness: number;
  tube_rigidity: number;
  tube_cutting_quality: boolean;
  tightness: boolean;
  external_thread_quality: boolean;
  laboratory_assistant_id: number;
  createdAt: Date;
  laboratory_assistant: ILaboratoryAssistant;
}

export interface IExtrusionParam {
  id: number;
  summary_id: number;
  counter_value: number;
  press_speed: number;
  blow_time: number;
  turning_machine_speed: number;
  annealing_furnace_temp: number;
  rondel_type_id: number;
  tube_cilindrical_section_length: number;
  membrane_thickness: number;
  tube_diameter: number;
  tube_cilindrical_section_thickness: number;
  tube_rigidity: number;
  tube_cutting_quality: boolean;
  tightness: boolean;
  external_thread_quality: boolean;
  employee_id: number;
  createdAt: Date;
  rondel_type: IRondelType;
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
  tube_cilindrical_section_length_min: number;
  tube_cilindrical_section_length_max: number;
  membrane_thickness_min: number;
  membrane_thickness_max: number;
  tube_diameter_min: number;
  tube_diameter_max: number;
  tube_cilindrical_section_thickness_min: number;
  tube_cilindrical_section_thickness_max: number;
  tube_rigidity_min: number;
  tube_rigidity_max: number;
  external_thread_value: string;
  rondel_type: IRondelType;
}

export interface CreateExtrusionEntryDto {
  summary_id: number;
  employee_id: number;
  counter_value: number;
  press_speed: number;
  blow_time: number;
  turning_machine_speed: number;
  annealing_furnace_temp: number;
  rondel_type_id: number;
  tube_cilindrical_section_length: number;
  membrane_thickness: number;
  tube_diameter: number;
  tube_cilindrical_section_thickness: number;
  tube_rigidity: number;
  tube_cutting_quality: boolean;
  tightness: boolean;
  external_thread_quality: boolean;
}

export default class ExtrusionService {
  static async createExtrusionEntry(dto: CreateExtrusionEntryDto): Promise<any> {
    const res = await $api.post(`${ApiRoutes.CREATE_EXTRUSION_ENTRY}`, dto);
    return res.data;
  }

  static async getHardwareTresholdsByProductId(product_id: number | null): Promise<IExtrusionHardwareTreshold> {
    const res = await $api.get(`${ApiRoutes.GET_EXTRUSION_HARDWARE_TRESHOLDS}/${product_id}`);
    return res.data;
  }

  static async getHardwareCurrentParamsBySummaryId(summary_id: number | null): Promise<IExtrusionHardwareParams> {
    const res = await $api.get(`${ApiRoutes.GET_EXTRUSION_HARDWARE_CURRENT_PARAMS}/${summary_id}`);
    return res.data;
  }

  static async getHardwareAllParamsBySummaryId(summary_id: number | null): Promise<IExtrusionHardwareParams[]> {
    const res = await $api.get(`${ApiRoutes.GET_EXTRUSION_HARDWARE_ALL_PARAMS}/${summary_id}`);
    return res.data;
  }

  // remove
  static async createHardwareCurrentParamsRecord(
    dto: CreateExtrusionHardwareParamsRecordDto
  ): Promise<ICreatedExtrusionHardwareParams> {
    const res = await $api.post(`${ApiRoutes.CREATE_EXTRUSION_HARDWARE_CURRENT_PARAM}`, dto);
    return res.data;
  }

  // static async getQualityTresholdsByProductId(product_id: number | null): Promise<IExtrusionQualityTreshold> {
  //   const res = await $api.get(`${ApiRoutes.GET_EXTRUSION_QUALITY_TRESHOLDS}/${product_id}`);
  //   return res.data;
  // }

  static async getQualityCurrentParamsBySummaryId(summary_id: number | null): Promise<IExtrusionQualityParams> {
    const res = await $api.get(`${ApiRoutes.GET_EXTRUSION_QUALITY_CURRENT_PARAMS}/${summary_id}`);
    return res.data;
  }

  static async getQualityAllParamsBySummaryId(summary_id: number | null): Promise<IExtrusionQualityParams[]> {
    const res = await $api.get(`${ApiRoutes.GET_EXTRUSION_QUALITY_ALL_PARAMS}/${summary_id}`);
    return res.data;
  }
}
