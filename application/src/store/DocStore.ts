import { action, computed, makeAutoObservable } from "mobx";
import SummaryService from "../services/SummaryService";
import handleError from "../shared/api/http/handleError";
import { IDoc } from "../types";

export default class DocStore {
  docs = {} as IDoc[];
  pending = false;
  error = {} as string[];

  constructor() {
    makeAutoObservable(this, {
      count: computed,
      noRecordsFound: computed,
      renderTable: computed,
      renderLoader: computed,
      fetchDocs: action,
    });
  }

  get renderTable() {
    return this.docs.length > 0 && !this.pending;
  }

  get noRecordsFound() {
    return this.docs.length === 0 && !this.pending;
  }

  get renderLoader() {
    return this.pending;
  }

  get count() {
    return this.docs.length;
  }

  setDocs(docs: IDoc[] | []) {
    this.docs = [...docs];
  }

  setPending(bool: boolean) {
    this.pending = bool;
  }

  setError(error: string[]) {
    this.error = error;
  }

  async fetchDocs() {
    try {
      this.setPending(true);
      this.setError([]);
      this.setDocs([]);

      const response = await SummaryService.getDocs();
      this.setDocs([...response.data]);
    } catch (error) {
      const errValue = handleError(error);
      this.setError([...errValue]);
    } finally {
      this.setPending(false);
    }
  }

  async deleteDoc(id: number) {
    try {
      this.setPending(true);
      this.setError([]);

      await SummaryService.deleteDoc(id);
      await this.fetchDocs();
    } catch (error) {
      const errValue = handleError(error);
      this.setError([...errValue]);
    } finally {
      this.setPending(false);
    }
  }
}
