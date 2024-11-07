import { action, computed, makeAutoObservable } from "mobx";
import SummaryService from "../services/SummaryService";
import handleError from "../shared/api/http/handleError";
import { IDocRow, IHistory, IRecord, IRecordDetailRecord } from "../types";
import { formatDateToString } from "../utils";
import HistoryService from "../services/HistoryService";

export default class RecordDetailStore {
  histories = {} as IHistory[];
  record: IRecordDetailRecord | null = null;
  pending = false;
  error = {} as string[];

  constructor() {
    makeAutoObservable(this, {
      // stringDate: computed,
      count: computed,
      noHistoriesFound: computed,
      renderTable: computed,
      renderLoader: computed,
      fetchHistoriesByRecId: action,
      updateHistories: action,
    });
  }

  // get stringDate() {
  //   if (this.record) {
  //     return formatDateToString(this.record.doc.date);
  //   }
  //   return null;
  // }

  get renderTable() {
    return this.histories.length > 0 && !this.pending;
  }

  get noHistoriesFound() {
    return this.histories.length === 0 && !this.pending;
  }
  get renderLoader() {
    return this.pending;
  }

  get count() {
    return this.histories.length;
  }

  setHistories(histories: IHistory[] | []) {
    this.histories = [...histories];
  }
  setRecord(record: IRecordDetailRecord | null) {
    this.record = record;
  }

  setPending(bool: boolean) {
    this.pending = bool;
  }

  setError(error: string[]) {
    this.error = error;
  }

  async fetchHistoriesByRecId(recordId: string) {
    try {
      this.setPending(true);
      this.setError([]);
      this.setHistories([]);
      this.setRecord(null);
      const response = await SummaryService.getRecordDetailById(recordId);
      await this.setRecord({ ...response.data });
      await this.setHistories([...response.data.histories]);
      await this.setPending(false);
    } catch (error) {
      const errValue = handleError(error);
      await this.setError([...errValue]);
    } finally {
      await this.setPending(false);
    }
  }
  // async fetchRecordById(id: string) {
  //   if (id) {
  //     try {
  //       this.setPending(true);
  //       this.setError([]);
  //       this.setRecord(null);
  //       const response = await SummaryService.getRecordById(id);
  //       await this.setRecord(response.data);
  //     } catch (error) {
  //       const errValue = handleError(error);
  //       this.setError([...errValue]);
  //     } finally {
  //       this.setPending(false);
  //     }
  //   }
  // }

  async updateHistories(recordId: string) {
    if (recordId) {
      try {
        this.setPending(true);
        this.setError([]);
        const response = await SummaryService.getRecordDetailById(recordId);
        this.setHistories(response.data.histories);
      } catch (error) {
        const errValue = handleError(error);
        this.setError([...errValue]);
        console.log([...errValue]);
      } finally {
        this.setPending(false);
      }
    }
  }
}
