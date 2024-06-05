import { makeAutoObservable } from "mobx";
import { $api } from "../http";
import handleError from "../http/handleError";

interface IOccupation {
  id: number;
  value: string;
  description: string;
}

export interface IEmployee {
  id: number;
  name: string;
  barcode: string;
  occupationId: number;
  occupation: IOccupation;
}

export default class EmployeeStore {
  employee: IEmployee = {} as IEmployee;
  pending: boolean = false;
  error = "";
  constructor() {
    makeAutoObservable(this, {});
  }

  setEmployee(employee: IEmployee) {
    this.employee = employee;
  }

  setPending(bool: boolean) {
    this.pending = bool;
  }

  setError(error: string) {
    this.error = error;
  }

  async getEmployeeByBarcode(barcode: string) {
    try {
      this.setError("");
      this.setPending(true);
      const responce = await $api.get(`/employees/${barcode}`);
      this.setEmployee(responce.data);
    } catch (error) {
      const errValue = handleError(error);
      this.setError(errValue);
    } finally {
      this.setPending(false);
    }
  }

  clearEmployee() {
    this.setEmployee({} as IEmployee);
  }
}
