import { action, computed, makeAutoObservable } from "mobx";
import { IEmployee } from "../types";
import handleError from "../http/handleError";
import EmployeeService from "../services/EmployeeService";

export default class EmployeeStore {
  employees = {} as IEmployee[];
  pending = false;
  error = {} as string[];

  constructor() {
    makeAutoObservable(this, {
      count: computed,
      noRecordsFound: computed,
      renderTable: computed,
      renderLoader: computed,
      fetchEmployees: action,
    });
  }

  get renderTable() {
    return this.employees.length > 0 && !this.pending;
  }

  get noRecordsFound() {
    return this.employees.length === 0 && !this.pending;
  }

  get renderLoader() {
    return this.pending;
  }

  get count() {
    return this.employees.length;
  }

  setPending(bool: boolean) {
    this.pending = bool;
  }

  setError(error: string[]) {
    this.error = error;
  }

  setEmployees(employees: IEmployee[] | []) {
    this.employees = [...employees];
  }

  async fetchEmployees() {
    try {
      this.setPending(true);
      this.setError([]);
      this.setEmployees([]);
      const response = await EmployeeService.getEmployees();
      await this.setEmployees([...response.data]);
    } catch (error) {
      const errValue = handleError(error);
      await this.setError([...errValue]);
    } finally {
      await this.setPending(false);
    }
  }
}
