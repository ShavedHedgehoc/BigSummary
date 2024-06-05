import { makeAutoObservable } from "mobx";
import { $api } from "../http";
import handleError from "../http/handleError";

export interface HistoriePayload {
  boil: string;
  code: string | null;
  historyType: string;
  userId: null;
  employeeId: number;
  note: string;
}

export interface IHistorie {
  id: number;
  userId: number | null;
  employeeId: number;
  note: string | null;
  recordId: number;
  historyTypeId: number;
}

export default class HistoriesStore {
  histories: IHistorie[] = [];
  pending: boolean = false;
  error = "";
  constructor() {
    makeAutoObservable(this, {});
  }

  setHistories(histories: IHistorie[]) {
    this.histories = histories;
  }

  setPending(bool: boolean) {
    this.pending = bool;
  }

  setError(error: string) {
    this.error = error;
  }

  async addHistories(payload: HistoriePayload) {
    const json = JSON.stringify(payload);
    try {
      this.setError("");
      this.setPending(true);
      const response = await $api.post(`/histories`, json);
      this.setHistories(response.data);
    } catch (error) {
      const errValue = handleError(error);
      this.setError(errValue);
    } finally {
      this.setPending(false);
    }
  }
}
