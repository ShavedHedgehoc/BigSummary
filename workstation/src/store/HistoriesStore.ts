import { action, computed, makeAutoObservable } from "mobx";
import { $api } from "../http";
import handleError from "../http/handleError";

export interface HistoriePayload {
  record_id: number | null;
  boil_value: string;
  base_code: string | null;
  code: string | null;
  historyType: string;
  userId: null;
  employeeId: number;
  note: string;
}

// export interface IHistorie {
//   id: number;
//   userId: number | null;
//   employeeId: number;
//   note: string | null;
//   recordId: number;
//   historyTypeId: number;
// }

export default class HistoriesStore {
  // histories: IHistorie[] = [];
  pending: boolean = false;
  error = "";
  constructor() {
    makeAutoObservable(this, {
      isError: computed,
      addHistories: action,
    });
  }

  // setHistories(histories: IHistorie[]) {
  //   this.histories = histories;
  // }

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
      // const response = await $api.post(`/histories`, json);
      // this.setHistories(response.data);
    } catch (error) {
      const errValue = handleError(error);
      this.setError(errValue);
    } finally {
      await new Promise((r) => setTimeout(r, 500));
      this.setPending(false);
    }
  }
}
