import { makeAutoObservable } from "mobx";
import { perPageValues } from "../components/tables/PaginationComponent";
import EmployeeStore from "./EmployeeStore";

export default class EmployeePaginationStore {
  page: number = 1;
  limit: number = perPageValues[0];
  employeeStore;

  constructor(employeeStore: EmployeeStore) {
    makeAutoObservable(this);
    this.employeeStore = employeeStore;
  }

  setPage(page: number) {
    this.page = page;
  }

  setLimit(limit: number) {
    this.limit = limit;
  }

  increasePage() {
    this.page = this.page + 1;
  }

  decreasePage() {
    this.page = this.page - 1;
  }

  async nextPage() {
    this.increasePage();
  }

  async prevPage() {
    this.decreasePage();
  }

  async firstPage() {
    this.setPage(1);
  }
  async lastPage() {
    this.setPage(this.pages);
  }

  async changeLimit(num: number) {
    this.setLimit(num);
  }

  get page_val() {
    return this.page;
  }

  get pages() {
    return Math.ceil(this.employeeStore.count / this.limit);
  }

  get total() {
    return this.employeeStore.count;
  }

  get firstRecord(): number {
    if (this.employeeStore.count === 0) {
      return 0;
    }
    return 1 + (this.page - 1) * this.limit;
  }

  get lastRecord(): number {
    return this.page * this.limit > this.employeeStore.count ? this.employeeStore.count : this.page * this.limit;
  }
}
