import { makeAutoObservable } from "mobx";
import HistoryService, { AddHistoryDto, HistoryCreateDirectDto } from "../services/HistoryService";
import handleError from "../shared/api/http/handleError";

export default class HistoryStore {
  pending = false;
  error = {} as string[];

  constructor() {
    makeAutoObservable(this, {});
  }

  setPending(bool: boolean) {
    this.pending = bool;
  }

  setError(error: string[]) {
    this.error = error;
  }

  async createHistoryBaseCheck(data: HistoryCreateDirectDto) {
    try {
      this.setPending(true);
      this.setError([]);
      await HistoryService.createHistoryBaseCheck(data);
    } catch (error) {
      const errValue = handleError(error);

      if (typeof errValue === "object") {
        this.setError([...errValue]);
      } else {
        this.setError([errValue]);
      }
    } finally {
      this.setPending(false);
    }
  }

  async createHistory(data: AddHistoryDto) {
    try {
      this.setPending(true);
      this.setError([]);
      await HistoryService.createHistory(data);
    } catch (error) {
      const errValue = handleError(error);

      if (typeof errValue === "object") {
        this.setError([...errValue]);
      } else {
        this.setError([errValue]);
      }
    } finally {
      this.setPending(false);
    }
  }

  async createHistoryDirect(data: HistoryCreateDirectDto) {
    try {
      this.setPending(true);
      this.setError([]);
      await HistoryService.createHistoryDirect(data);
    } catch (error) {
      const errValue = handleError(error);

      if (typeof errValue === "object") {
        this.setError([...errValue]);
      } else {
        this.setError([errValue]);
      }
    } finally {
      this.setPending(false);
    }
  }

  async deleteHistory(id: number) {
    try {
      this.setPending(true);
      this.setError([]);
      await HistoryService.deleteHistory(id);
    } catch (error) {
      const errValue = handleError(error);

      if (typeof errValue === "object") {
        this.setError([...errValue]);
      } else {
        this.setError([errValue]);
      }
    } finally {
      this.setPending(false);
    }
  }
}
