import React, { Component } from "react";

import {
  List,
  Segment,
  Header,
  Icon,
  Loader,
  Placeholder,
  Button
} from "semantic-ui-react";
import { APPBAR_HEIGHT } from "../AppBar";
import { inject, observer } from "mobx-react";

import moment from "moment";

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

const Section = ({ name, inverted, tasks, isOverdue }) => {
  console.log(isOverdue);
  return (
    <List key={name} inverted={inverted} size="large">
      <If condition={name && name.length > 0}>
        <List.Item>
          <List.Header as="h3" style={isOverdue ? { color: "#c0392b" } : null}>
            {name}
          </List.Header>
        </List.Item>
      </If>

      {tasks.map(t => (
        <Task key={t.id} {...t} inverted={inverted} />
      ))}

      <List.Item style={{ paddingTop: 10 }}>
        <Button compact fluid basic>
          <Icon name="add" />
          Add new task
        </Button>
      </List.Item>
    </List>
  );
};

const Sections = ({ days, tasks, inverted }) => {
  let sections = ["Overdue", "Today", "Tomorrow"];

  for (let i = 2; i < days; i++) {
    sections.push(
      moment()
        .add(i, "day")
        .format("dddd")
    );
  }

  sections.length = days > 0 ? days + 1 : 0;
  sections = days > 0 ? sections : [""];

  return sections.map(s => (
    <Section
      key={s}
      name={s}
      tasks={tasks}
      inverted={inverted}
      isOverdue={s === sections[0]}
    />
  ));
};

@inject("todoStore", "commonStore")
@observer
class TasksList extends Component {
  render() {
    const { todoStore, commonStore, days } = this.props;
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
              <div style={styles.taskView}>
                <Sections
                  days={days}
                  tasks={todoStore.tasks}
                  inverted={inverted}
                />
              </div>
            }
          />
        }
      />
    );
  }
}

export default TasksList;
