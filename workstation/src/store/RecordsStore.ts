import { makeAutoObservable } from "mobx";
import { $api } from "../http";
import handleError from "../http/handleError";
import { IEmployee } from "./EmployeeStore";

export interface IProduct {
  id: number;
  code1C: string;
  marking: string;
}

export interface IBoil {
  id: number;
  value: string;
}

export interface IRecord {
  product: IProduct;
  boil: IBoil;
}

export interface IHistoryType {
  id: number;
  value: string;
  description: string;
}

export interface IHistorieRecord {
  id: number;
  userId: number | null;
  employeeId: number;
  note: string | null;
  recordId: number;
  historyTypeId: number;
  historyType: IHistoryType;
  employee: IEmployee;
  record: IRecord;
  createdAt: Date;
}

export default class RecordsStore {
  records: IHistorieRecord[] = [];
  pending: boolean = false;
  error = "";
  constructor() {
    makeAutoObservable(this, {});
  }

  setRecords(records: IHistorieRecord[]) {
    this.records = records;
  }

  setPending(bool: boolean) {
    this.pending = bool;
  }

  setError(error: string) {
    this.error = error;
  }

  async fetchRecords() {
    try {
      this.setError("");
      this.setPending(true);
      const responce = await $api.get(`/histories/last_ten`);
      this.setRecords(responce.data);
    } catch (error) {
      const errValue = handleError(error);
      this.setError(errValue);
    } finally {
      this.setPending(false);
    }
  }
}
