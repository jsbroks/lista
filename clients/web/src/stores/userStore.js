import { observable, computed, action, flow } from "mobx";
import User from "../models/User";
import { snakeToCamel } from "../utilities/requests";

import Users from "../utilities/endpoints/users";

class UserStore {
  @observable loadingUser = true;
  @observable updatingUser = false;
  @observable user = null;

  constructor() {
    this.getUser();
  }

  @computed get displayName() {
    return "anonymous";
  }

  @computed get isAuthenticated() {
    return this.user != null;
  }

  @action
  setUser(user) {
    if (user instanceof User) {
      this.user = user;
    } else {
      this.user = new User(snakeToCamel(user));
    }
  }

  @action
  login = (username, password) => {
    this.loadingUser = true;

    this.loadingUser = false;
    return false;
  };

  @action
  logout = () => {
    if (this.isAuthenticated) {
      return true;
    }
    return false;
  };

  getUser = flow(function*() {
    this.loadingUser = true;

    try {
      this.setUser((yield Users.me()).data);
    } finally {
      this.loadingUser = false;
    }
  });
}

export default new UserStore();
