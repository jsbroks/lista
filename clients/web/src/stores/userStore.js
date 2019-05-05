import { observable, computed, action } from "mobx";
import User from "../models/User";

class UserStore {
  @observable loadingUser = true;
  @observable updatingUser = false;
  @observable user = null;

  constructor() {
    this.user = new User(this, { firstName: "test1", lastName: "test2" });
  }

  @computed get displayName() {
    return "anonymous";
  }

  @computed get isAuthenticated() {
    return this.user != null;
  }

  @action
  login = (username, password) => {
    this.loadingUser = true;

    return false;
  };

  @action
  logout = () => {
    if (this.isAuthenticated) {
      return true;
    }
    return false;
  };
}

export default new UserStore();
