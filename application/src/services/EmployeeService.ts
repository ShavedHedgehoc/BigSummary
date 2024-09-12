import { $api } from "../http";
import { AxiosResponse } from "axios";
import { IEmployee } from "../types";

export default class EmployeeService {
  static async getEmployees(): Promise<AxiosResponse<IEmployee[]>> {
    return $api.get(`/employees`);
  }
}
