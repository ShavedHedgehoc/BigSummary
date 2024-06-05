import { makeAutoObservable } from "mobx";
import HistoryService, { HistoryCreateDto } from "../services/HistoryService";
import handleError from "../http/handleError";

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

  async createHistory(data: HistoryCreateDto) {
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

      //   console.log(errValue);
    } finally {
      this.setPending(false);
    }
  }
}
