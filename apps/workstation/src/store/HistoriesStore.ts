import { action, computed, makeAutoObservable } from "mobx";
import { $api } from "../http";
import handleError from "../http/handleError";

export interface HistoriePayload {
  record_id: number | null;
  boil_value: string | null;
  base_code: string | null;
  code: string | null;
  historyType: string;
  userId: null;
  employeeId: number;
  note: string;
  plant_id: number | null;
}

export default class HistoriesStore {
  pending: boolean = false;
  error = "";
  constructor() {
    makeAutoObservable(this, {
      isError: computed,
      addHistories: action,
    });
  }

  get isError() {
    return !this.pending && this.error.length > 0;
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
      await $api.post(`/histories`, json);
    } catch (error) {
      const errValue = handleError(error);
      this.setError(errValue);
    } finally {
      await new Promise((r) => setTimeout(r, 500));
      this.setPending(false);
    }
  }
}
