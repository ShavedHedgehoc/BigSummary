import { makeAutoObservable } from "mobx";
import EmployeeStore from "./EmployeeStore";

export interface EmployeeFilter {
  name: string;
  occupations: number[] | [];
}

export enum EmployeeFilterParams {
  NAME = "name",
  OCCUPATIONS = "occupations",
}

const initEmployeeFilter: EmployeeFilter = {
  name: "",
  occupations: [],
};

export default class EmployeeFilterStore {
  filter: EmployeeFilter = initEmployeeFilter;
  employeeStore;

  constructor(employeeStore: EmployeeStore) {
    makeAutoObservable(this);
    this.employeeStore = employeeStore;
  }

  clearFilter() {
    this.filter = initEmployeeFilter;
    this.employeeStore.fetchEmployees();
  }

  renewData() {
    this.employeeStore.fetchEmployees();
  }
}
