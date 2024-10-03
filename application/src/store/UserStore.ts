import { action, computed, makeAutoObservable } from "mobx";

import handleError from "../http/handleError";

import UserService from "../services/UserService";
import { IUserRow } from "../types";

export default class UserStore {
  pending = false;
  error = {} as string[];
  users = {} as IUserRow[] | [];

  constructor() {
    makeAutoObservable(this, {
      noRecordsFound: computed,
      renderTable: computed,
      renderLoader: computed,
      fetchUsers: action,
    });
  }
  get noRecordsFound() {
    if (this.users.length === 0 && !this.pending) {
      return true;
    }
    return false;
  }

  get renderTable() {
    return this.users.length > 0;
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

  setUsers(users: IUserRow[] | []) {
    this.users = [...users];
  }

  async fetchUsers() {
    try {
      this.setPending(true);
      this.setError([]);
      this.setUsers([]);
      const response = await UserService.getUsers();
      await this.setUsers(response.data);
    } catch (error) {
      const errValue = handleError(error);
      this.setError([...errValue]);
    } finally {
      this.setPending(false);
    }
  }
}
