import { makeAutoObservable } from "mobx";
import { $api } from "../http";
import handleError from "../http/handleError";

export default class HealthStore {
  pending: boolean = false;
  error = "";
  constructor() {
    makeAutoObservable(this, {});
  }

  setPending(bool: boolean) {
    this.pending = bool;
  }

  setError(error: string) {
    this.error = error;
  }

  async checkHealth() {
    try {
      this.setPending(true);
      await $api.get(`/workshops`);
      this.setError("");
    } catch (error) {
      const errValue = handleError(error);
      this.setError(errValue);
    } finally {
      this.setPending(false);
    }
  }
}
