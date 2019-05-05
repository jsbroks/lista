import { observable, computed } from "mobx";

class User {
  @observable id;

  @observable username;
  @observable firstName;
  @observable lastName;
  @observable isAdmin;
  @observable created;
  @observable avatarUrl;

  constructor({
    id,
    username,
    firstName,
    lastName,
    isAdmin,
    created,
    avatarUrl,
  }) {
    this.id = id;
    this.username = username;
    this.firstName = firstName || "";
    this.lastName = lastName || "";
    this.isAdmin = isAdmin || false;
    this.created = new Date(created);
    this.avatarUrl = avatarUrl || null;
  }

  @computed
  get displayName() {
    if (this.firstName || this.lastName)
      return `${this.firstName} ${this.lastName}`;
    return this.username;
  }

  @computed
  get avatar() {
    const name = this.displayName.toUpperCase().replace(/ /g, "+");
    const url = `https://ui-avatars.com/api/?name=${name}`;
    return this.avatarUrl ? this.avatarUrl : url;
  }
}

export default User;
