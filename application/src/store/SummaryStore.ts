import { action, computed, makeAutoObservable } from "mobx";
import SummaryService from "../services/SummaryService";
import handleError from "../http/handleError";
import { IRecord, ISummaryUploadData } from "../types";

export default class SummaryStore {
  records = {} as IRecord[];
  pending = false;
  recordPending = false;
  error = {} as string[];
  updateRecordId: null | number = null;

  constructor() {
    makeAutoObservable(this, {
      count: computed,
      noRecordsFound: computed,
      renderTable: computed,
      renderLoader: computed,
      fetchRecords: action,
    });
  }

  get renderTable() {
    return this.records.length > 0 && !this.pending;
  }

  get noRecordsFound() {
    return this.records.length === 0 && !this.pending;
  }

  get renderLoader() {
    return this.pending;
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

  setRecordPending(bool: boolean) {
    this.recordPending = bool;
  }

  setError(error: string[]) {
    this.error = error;
  }

  setUpdateRecordId(recordId: number | null) {
    this.updateRecordId = recordId;
  }

  async fetchRecords(plantId: string) {
    try {
      this.setPending(true);
      this.setError([]);
      this.setRecords([]);

      const response = await SummaryService.getRecords(plantId);
      // await setTimeout(() => {
      //   this.setRecords([...response.data.records]);
      //   this.setPending(false);
      // }, 2000);
      await this.setRecords([...response.data.records]);
      await this.setPending(false);
    } catch (error) {
      const errValue = handleError(error);
      await this.setError([...errValue]);
      // await setTimeout(() => {
      //   this.setPending(false);
      // }, 2000);
      //  this.setPending(false);
    } finally {
      await this.setPending(false);
    }
  }

  // async fetchDocs() {
  //   try {
  //     this.setPending(true);
  //     this.setError([]);
  //   } catch (error) {
  //     const errValue = handleError(error);
  //     this.setError([...errValue]);
  //   } finally {
  //     this.setPending(false);
  //   }
  // }

  async uploadData(data: ISummaryUploadData) {
    try {
      this.setPending(true);
      this.setError([]);
      await SummaryService.bulkCreateRecords(data);
    } catch (error) {
      const errValue = handleError(error);
      this.setError([...errValue]);
      // console.log(errValue);
    } finally {
      this.setPending(false);
    }
  }

  async clearError() {
    this.setError([]);
  }

  async updateRecord(recordId: number) {
    try {
      this.setUpdateRecordId(recordId);
      this.setRecordPending(true);
      const response = await SummaryService.getRecordById(recordId.toString());
      this.records = this.records.map((item) => (item.id == recordId ? response.data : item));
    } catch (error) {
      const errValue = handleError(error);
      this.setError([...errValue]);
      console.log(errValue);
    } finally {
      this.setRecordPending(false);
      this.setUpdateRecordId(null);
    }
  }
}
