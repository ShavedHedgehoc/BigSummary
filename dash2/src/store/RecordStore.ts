import { makeAutoObservable } from "mobx";
import SummaryService, { IRecord } from "../services/SummaryService";

export default class RecordStore {
  record = {} as IRecord;
  pending = false;
  error = "";
  pendingComplete = false;

  constructor() {
    makeAutoObservable(this, {});
  }

  setRecord(record: IRecord) {
    this.record = record;
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

  async fetchRecordById(recordId: string | undefined) {
    try {
      this.setPending(true);
      this.setPendingComplete(false);
      const response = await SummaryService.getRecordById(recordId);
      this.setRecord(response.data);
      this.setPendingComplete(true);
    } catch (error) {
      this.setRecord({} as IRecord);
    } finally {
      this.setPending(false);
    }
  }
}
