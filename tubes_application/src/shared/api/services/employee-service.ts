import { $api } from "../http";
import { ApiRoutes } from "./api-routes";

export interface IEmployee {
  id: number;
  name: string;
  barcode: string;
}
// employee login
export default class EmployeeService {
  static async getEmployeeByBarcode(barcode: string): Promise<IEmployee> {
    const res = await $api.get(`${ApiRoutes.GET_EMPLOYEES_BY_BARCODE}${barcode}`);
    return res.data;
  }
}
