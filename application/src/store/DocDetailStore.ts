import { action, computed, makeAutoObservable } from "mobx";
import SummaryService from "../services/SummaryService";
import handleError from "../http/handleError";
import { IDoc } from "../types";
import { formatDateToString } from "../utils";

export default class DocDetailStore {
  pending = false;
  error = {} as string[];
  doc = {} as IDoc | null;

  constructor() {
    makeAutoObservable(this, {
      stringDate: computed,
      count: computed,
      noRecordsFound: computed,
      renderTable: computed,
      renderLoader: computed,
      fetchDocByid: action,
    });
  }

  get stringDate() {
    if (this.doc?.date) {
      return formatDateToString(this.doc?.date);
    }
    return null;
  }

  get count() {
    return this.doc?.records.length;
  }

  get noRecordsFound() {
    if (this.doc) {
      return this.doc.records.length === 0 && !this.pending;
    } else {
      return !this.pending;
    }
  }

  get renderTable() {
    if (this.doc?.records) {
      return this.doc.records.length > 0 && !this.pending;
    }
    return false;
  }

  get renderLoader() {
    return this.pending;
  }

  setDoc(doc: IDoc | null) {
    this.doc = doc;
  }

  setPending(bool: boolean) {
    this.pending = bool;
  }

  setError(error: string[]) {
    this.error = error;
  }

  async fetchDocByid(id: string) {
    if (id) {
      try {
        this.setPending(true);
        this.setError([]);
        this.setDoc(null);
        const response = await SummaryService.getDocsById(id);
        this.setDoc(response.data);
      } catch (error) {
        const errValue = handleError(error);
        this.setError([...errValue]);
      } finally {
        this.setPending(false);
      }
    }
  }
}
