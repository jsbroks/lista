import { observable, computed, action } from "mobx";
import { mapKeys, rearg, camelCase } from "lodash";

import axios from "axios";

class CommonStore {
  @observable name = "Lista";
  @observable version = null;
  @observable loading = true;

  constructor() {
    this.loadInfo();
  }

  @computed get hasVersion() {
    return this.version != null;
  }

  @action
  loadInfo() {
    this.loading = true;
    const test = { exampleSnake: true };
    console.log(mapKeys(test, rearg(camelCase, 1)));
  }
}

export default new CommonStore();
