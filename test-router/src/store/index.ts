import AuthStore from "./AuthStore";

export default class RootStore {
  AuthStore;

  constructor() {
    this.AuthStore = new AuthStore();
  }
}
