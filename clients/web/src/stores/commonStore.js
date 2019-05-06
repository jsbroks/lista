import { observable, computed, action, flow } from "mobx";
import Info from "../utilities/endpoints/info";

class CommonStore {
  @observable name = "Lista";
  @observable version = "";
  @observable loading = true;
  @observable totalUsers = 1;
  @observable allowRegistration = true;

  constructor() {
    this.loadInfo();
  }

  @computed get hasVersion() {
    return this.version.length === 0;
  }

  @computed get requiresSetup() {
    return this.totalUsers === 0;
  }

  loadInfo = flow(function*() {
    this.loading = true;

    try {
      const data = (yield Info.get()).data;

      this.version = data.version;
      this.name = data.name;

      this.totalUsers = data.total_users;
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  });
}

export default new CommonStore();
