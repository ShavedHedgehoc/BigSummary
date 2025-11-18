import { $api } from "../http";
import { ApiRoutes } from "./api-routes";

export interface ILaboratoryAssistant {
  id: number;
  name: string;
  barcode: string;
}

export default class LaboratoryAssistantService {
  static async getLaboratoryAssistantByBarcode(barcode: string): Promise<ILaboratoryAssistant> {
    const res = await $api.get(`${ApiRoutes.GET_LABORATORY_ASSISTANT_BY_BARCODE}/${barcode}`);
    return res.data;
  }
}
