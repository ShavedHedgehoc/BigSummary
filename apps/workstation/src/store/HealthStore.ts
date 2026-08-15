import { action, computed, makeAutoObservable } from "mobx";
import { $api } from "../http";
import handleError from "../http/handleError";

export default class HealthStore {
  pending: boolean = false;
  error = "";
  constructor() {
    makeAutoObservable(this, { serverFalldown: computed, serverOk: computed, checkHealth: action });
  }

  setPending(bool: boolean) {
    this.pending = bool;
  }

  setError(error: string) {
    this.error = error;
  }

  get serverFalldown() {
    return this.error.length > 0;
  }
  get serverOk() {
    return !this.pending && this.error.length === 0;
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
      await new Promise((r) => setTimeout(r, 500));
      this.setPending(false);
    }
  }
}
