import { observable, computed, action, flow } from "mobx";

import { snakeToCamel } from "../utilities/requests";

import axios from "axios";

function getInfo() {
  return axios.get("/api/v1/info/");
}

class CommonStore {
  @observable name = "Lista";
  @observable version = "";
  @observable loading = true;
  @observable totalUsers = 1;
  @observable allowRegistration = false;

  constructor() {
    this.loadInfo();
  }

  @computed get hasVersion() {
    return this.version.length === 0;
  }

  loadInfo = flow(function*() {
    this.loading = true;

    try {
      const data = (yield getInfo()).data;

      this.version = data.version.trim();
      this.name = data.response;
      this.totalUsers = data.total_users;
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  });
}

export default new CommonStore();
