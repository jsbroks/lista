import { observable, computed, flow } from "mobx";

import Tasks from "../utilities/endpoints/tasks";

class TodoStore {
  @observable loadingTasks = false;

  @observable tasks = [];

  @observable filter = "";

  constructor() {
    this.getTasks();
  }

  getTasks = flow(function*() {
    this.loadingTasks = true;

    try {
      const data = (yield Tasks.get()).data;
      this.tasks = data.tasks;
    } finally {
      this.loadingTasks = false;
    }
  });

  @computed get isFilterEmpty() {
    return this.tasks.length === 0;
  }
}

export default new TodoStore();
