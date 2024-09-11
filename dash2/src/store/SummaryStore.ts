import { computed, makeAutoObservable } from "mobx";
import RecordService, { IRecord } from "../services/SummaryService";

export default class SummaryStore {
  records = {} as IRecord[];
  pending = false;
  error = "";
  pendingComplete = false;

  constructor() {
    makeAutoObservable(this, {
      count: computed,
    });
  }

  get count() {
    return this.records.length;
  }

  setRecords(records: IRecord[] | []) {
    this.records = [...records];
  }
  setPending(bool: boolean) {
    this.pending = bool;
  }

  setPendingComplete(bool: boolean) {
    this.pendingComplete = bool;
  }

  setError(error: string) {
    this.error = error;
  }

  async fetchRecords(plantId: string | undefined) {
    try {
      this.setPending(true);
      this.setPendingComplete(false);
      const response = await RecordService.getRecords(plantId);
      this.setPendingComplete(true);
      this.setRecords(response.data.records);
    } catch (error) {
      this.setRecords([]);
    } finally {
      this.setPendingComplete(true);
      this.setPending(false);
    }
  }
}
