import { makeAutoObservable } from "mobx";
// import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import handleError from "../http/handleError";

export interface IUser {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

export default class AuthStore {
  user = {} as IUser;
  isAuth = false;
  pending = false;
  error = {} as string[];

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setPending(bool: boolean) {
    this.pending = bool;
  }

  setError(error: string[]) {
    this.error = error;
  }

  async login(email: string, password: string) {
    try {
      this.setPending(true);
      this.setError([]);
      const response = await AuthService.login(email, password);
      localStorage.setItem("accessToken", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      const errValue = handleError(error);
      this.setError([...errValue]);
    } finally {
      this.setPending(false);
    }
  }

  async register(name: string, email: string, password: string) {
    try {
      this.setPending(true);
      this.setError([]);
      const response = await AuthService.register(name, email, password);
      localStorage.setItem("accessToken", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      const errValue = handleError(error);
      this.setError([...errValue]);
    } finally {
      this.setPending(false);
    }
  }

  async logout() {
    try {
      this.setPending(true);
      this.setError([]);
      await AuthService.logout();
      localStorage.removeItem("accessToken");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (error) {
      const errValue = handleError(error);
      this.setError([...errValue]);
    } finally {
      this.setPending(false);
    }
  }

  async checkAuth() {
    this.setPending(true);
    this.setError([]);
    try {
      const response = await AuthService.check();
      localStorage.setItem("accessToken", response.data.token);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      const errValue = handleError(error);
      this.setError([...errValue]);
    } finally {
      this.setPending(false);
    }
  }
}
