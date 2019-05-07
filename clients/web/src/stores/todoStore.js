import { observable, computed, flow } from "mobx";

import Tasks from "../utilities/endpoints/tasks";

class TodoStore {
  @observable loadingTasks = false;

  @observable tasks = [];
  @observable tasksMap = new Map();

  @observable filter = "";

  constructor() {
    this.getTasks();
  }

  getTasks = flow(function*(filter) {
    this.loadingTasks = true;

    try {
      const data = (yield Tasks.get()).data;
      this.tasks = data.tasks;

      this.mapTasks(this.tasks);
    } finally {
      this.loadingTasks = false;
    }
  });

  mapTasks(tasks) {
    if (!tasks) return;

    for (let task of tasks) {
      this.tasksMap.set(task.id, task);
      this.mapTasks(tasks.subtasks);
    }
  }

  @computed get isFilterEmpty() {
    return this.tasks.length === 0;
  }
}

export default new TodoStore();
