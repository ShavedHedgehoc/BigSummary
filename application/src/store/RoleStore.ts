import { action, computed, makeAutoObservable } from "mobx";

import handleError from "../http/handleError";
import { IRole } from "../types";
import RoleService from "../services/RoleService";

export default class RoleStore {
  pending = false;
  error = {} as string[];
  roles = {} as IRole[] | [];

  constructor() {
    makeAutoObservable(this, {
      noRecordsFound: computed,
      renderTable: computed,
      renderLoader: computed,
      fetchRoles: action,
    });
  }
  get noRecordsFound() {
    if (this.roles.length === 0 && !this.pending) {
      return true;
    }
    return false;
  }

  get renderTable() {
    return this.roles.length > 0;
  }

  get renderLoader() {
    return this.pending;
  }

  setPending(bool: boolean) {
    this.pending = bool;
  }

  setError(error: string[]) {
    this.error = error;
  }

  setRoles(roles: IRole[] | []) {
    this.roles = [...roles];
  }

  async fetchRoles() {
    try {
      this.setPending(true);
      this.setError([]);
      this.setRoles([]);
      const response = await RoleService.getRoles();
      await this.setRoles(response.data);
    } catch (error) {
      const errValue = handleError(error);
      this.setError([...errValue]);
    } finally {
      this.setPending(false);
    }
  }
}
