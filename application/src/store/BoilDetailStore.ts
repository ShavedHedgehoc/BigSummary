import { action, computed, makeAutoObservable } from "mobx";
import SummaryService from "../services/SummaryService";
import handleError from "../http/handleError";
import { IDocRow, IHistory, IRecord, IRecordDetailRecord } from "../types";
import { formatDateToString } from "../utils";
import HistoryService from "../services/HistoryService";

export default class BoilDetailStore {
  histories = {} as IHistory[];
  //   record: IRecordDetailRecord | null = null;
  pending = false;
  error = {} as string[];

  constructor() {
    makeAutoObservable(this, {
      count: computed,
      noHistoriesFound: computed,
      renderTable: computed,
      renderLoader: computed,
      fetchHistoriesByBoilId: action,
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
  //   setRecord(record: IRecordDetailRecord | null) {
  //     this.record = record;
  //   }

  setPending(bool: boolean) {
    this.pending = bool;
  }

  setError(error: string[]) {
    this.error = error;
  }

  async fetchHistoriesByBoilId(boilId: string) {
    try {
      this.setPending(true);
      this.setError([]);
      this.setHistories([]);
      const response = await HistoryService.getHistoriesByBoilId(boilId);
      await this.setHistories([...response.data]);
    } catch (error) {
      const errValue = handleError(error);
      await this.setError([...errValue]);
    } finally {
      //   await new Promise((r) => setTimeout(r, 500));
      await this.setPending(false);
    }
  }
}
