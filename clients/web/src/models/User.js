import { observable, computed } from "mobx";

class User {
  @observable id;

  @observable username;
  @observable firstName;
  @observable lastName;
  @observable isAdmin;

  constructor(store, { id, username, firstName, lastName, isAdmin }) {
    this.store = store;

    this.id = id;
    this.username = username;
    this.firstName = firstName || "";
    this.lastName = lastName || "";
    this.isAdmin = isAdmin || false;
  }

  @computed
  get displayName() {
    if (this.firstName || this.lastName)
      return `${this.firstName} ${this.lastName}`;
    return this.username;
  }
}

export default User;
