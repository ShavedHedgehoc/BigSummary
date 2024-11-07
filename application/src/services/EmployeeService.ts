// import { $api } from "../http";
// import { AxiosResponse } from "axios";
// import { IEmployee } from "../types";

// export default class EmployeeService {
//   static async getEmployees(): Promise<AxiosResponse<IEmployee[]>> {
//     return $api.get(`/employees`);
//   }
// }

import { $api } from "../shared/api/http";

export interface IOccupation {
  id: number;
  value: string;
  description: string;
}

export interface IEmployee {
  id: number;
  name: string;
  barcode: string;
  occupation: IOccupation;
}

export interface IEmployeeResponse {
  employees: IEmployee[];
  total: number;
}

export interface IEmployeeFilter {
  occupations: number[] | [];
  nameFilter: string;
  nameAsc: boolean;
}

export interface IEmployeeGetDto {
  filter: IEmployeeFilter;
  page: number;
  limit: number;
}

export interface IEmployeeCreateDto {
  name: string;
  barcode: string;
  occupationId: number;
}

export interface IEmployeeUpdateDto {
  id: number;
  name: string;
  barcode: string;
  occupationId: number;
}

export default class EmployeeService {
  static async getEmployees(): Promise<IEmployee[]> {
    const res = await $api.get(`/employees`);
    await new Promise((r) => setTimeout(r, 500));
    return res.data;
  }

  static async getEmployeeListWithParams(dto: IEmployeeGetDto): Promise<IEmployeeResponse> {
    const res = await $api.post(`/employees/list`, dto);
    return res.data;
  }

  static async createEmployee(dto: IEmployeeCreateDto) {
    const res = await $api.post(`/employees`, dto);
    return res.data;
  }

  static async updateEmployee(dto: IEmployeeUpdateDto) {
    const res = await $api.put(`/employees`, dto);
    return res.data;
  }

  static async deleteEmployee(id: number) {
    return $api.delete(`/employees/${id}`);
  }
}
