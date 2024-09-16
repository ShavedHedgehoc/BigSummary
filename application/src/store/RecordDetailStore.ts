import { action, computed, makeAutoObservable } from "mobx";
import SummaryService from "../services/SummaryService";
import handleError from "../http/handleError";
import { IHistory, IRecord } from "../types";
import { formatDateToString } from "../utils";
import HistoryService from "../services/HistoryService";

export default class RecordDetailStore {
  pending = false;
  error = {} as string[];
  record = {} as IRecord | null;

  constructor() {
    makeAutoObservable(this, {
      stringDate: computed,
      //   count: computed,
      noRecordsFound: computed,
      renderTable: computed,
      renderLoader: computed,
      fetchRecordById: action,
    });
  }

  get stringDate() {
    if (this.record) {
      return formatDateToString(this.record.doc.date);
    }
    return null;
  }

  get noRecordsFound() {
    if (this.record) {
      return this.record.histories.length === 0 && !this.pending;
    } else {
      return !this.pending;
    }
  }

  get renderTable() {
    if (this.record?.histories) {
      return this.record.histories.length > 0 && !this.pending;
    }
    return false;
  }

  get renderLoader() {
    return this.pending;
  }

  setRecord(record: IRecord | null) {
    this.record = record;
  }

  setPending(bool: boolean) {
    this.pending = bool;
  }

  setError(error: string[]) {
    this.error = error;
  }

  setHistories(histories: IHistory[] | null) {
    if (this.record && histories) this.record = { ...this.record, histories: { ...histories } };
  }

  async fetchRecordById(id: string) {
    if (id) {
      try {
        this.setPending(true);
        this.setError([]);
        this.setRecord(null);
        const response = await SummaryService.getRecordById(id);
        this.setRecord(response.data);
      } catch (error) {
        const errValue = handleError(error);
        this.setError([...errValue]);
      } finally {
        this.setPending(false);
      }
    }
  }

  async updateHistories(id: string) {
    if (id) {
      try {
        this.setPending(true);
        this.setError([]);
        const response = await HistoryService.getHistoriesByRecordId(id);
        this.setHistories(response.data);
      } catch (error) {
        const errValue = handleError(error);
        this.setError([...errValue]);
      } finally {
        this.setPending(false);
      }
    }
  }
}
