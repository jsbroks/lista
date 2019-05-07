import React, { Component } from "react";

import {
  List,
  Segment,
  Header,
  Icon,
  Loader,
  Placeholder,
  Dimmer
} from "semantic-ui-react";
import { APPBAR_HEIGHT } from "../AppBar";
import { inject, observer } from "mobx-react";

import Task from "./Task";
import { If } from "../helpers";

const styles = {
  taskView: {
    paddingTop: 20,
    paddingBottom: 20,
    height: `calc(100vh - ${APPBAR_HEIGHT}px)`,
    overflowY: "auto"
  }
};

@inject("todoStore", "commonStore")
@observer
class TasksList extends Component {
  render() {
    const { todoStore, commonStore } = this.props;
    const inverted = commonStore.inverted;

    return (
      <If
        condition={todoStore.loadingTasks}
        isTrue={
          <Segment basic inverted={inverted}>
            <Loader inverted={inverted} active size="large">
              Loading tasks
            </Loader>
            <Placeholder fluid inverted={inverted}>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder>
          </Segment>
        }
        isFalse={
          <If
            condition={todoStore.isFilterEmpty}
            isTrue={
              <Segment basic placeholder inverted={inverted}>
                <Header icon>
                  <Icon name="gem" color="grey" />
                  Wow! No tasks found.
                </Header>
              </Segment>
            }
            isFalse={
              <List style={styles.taskView} inverted={inverted}>
                {todoStore.tasks.map(t => (
                  <Task key={t.id} {...t} inverted={inverted} />
                ))}
              </List>
            }
          />
        }
      />
    );
  }
}

export default TasksList;
