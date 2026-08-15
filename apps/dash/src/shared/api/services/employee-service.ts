import axios from "axios";

export interface EmployeeResponse {
  id: number;
  name: string;
  barcode: string;
  occupationId: number;
}

export default class EmployeeService {
  static async getByBarcode(barcode: string): Promise<EmployeeResponse> {
    const res = await axios.get(`/api/employees/${barcode}`);
    return res.data;
  }
}
