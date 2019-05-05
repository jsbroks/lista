import { observable } from "mobx";

class TodoStore {
  @observable todo = [];
}

export default new TodoStore();
