import { $api } from "../http";

export interface IEmployee {
  id: number;
  name: string;
  barcode: string;
  occupation: IOccupation;
}

export interface IOccupation {
  id: number;
  value: string;
  description: string;
}

export default class EmployeeService {
  static async getEmployees(): Promise<IEmployee[]> {
    const res = await $api.get(`/employees`);
    await new Promise((r) => setTimeout(r, 500));
    return res.data;
  }
}
