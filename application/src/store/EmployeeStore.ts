import { action, computed, makeAutoObservable } from "mobx";
import { IEmployee } from "../types";
import handleError from "../shared/api/http/handleError";
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
      this.setError([]);
      this.setPending(true);
      const response = await EmployeeService.getEmployees();
      this.setEmployees([...response.data]);
    } catch (error) {
      const errValue = handleError(error);
      await this.setError([...errValue]);
    } finally {
      await new Promise((r) => setTimeout(r, 500));
      await this.setPending(false);
    }
  }
}
