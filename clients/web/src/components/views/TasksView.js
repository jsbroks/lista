import React, { Component } from "react";
import { Container, Grid, List, Ref, Progress } from "semantic-ui-react";

import { inject, observer } from "mobx-react";
import ViewMenu from "../menus/ViewMenus";
import DropdownMenu from "../menus/DropdownMenus";
import TasksList from "../tasks/TasksList";

import Sortly, { convert, add, insert, remove } from "react-sortly";

const projects = [
  { id: 1, color: "red", name: "project1 test" },
  { id: 2, color: "green", name: "project2 test" },
  { id: 3, color: "black", name: "project3 test" }
];

const labels = [
  { id: 1, name: "Label 1" },
  { id: 2, name: "Label 2" },
  { id: 3, name: "Label 3" },
  { id: 4, name: "Label 4" },
  { id: 5, name: "Label 4" },
  { id: 6, name: "Label 4" },
  { id: 7, name: "Label 4" },
  { id: 8, name: "Label 4" },
  { id: 9, name: "Label 4" },
  { id: 10, name: "Label 4" },
  { id: 11, name: "Label 4" },
  { id: 12, name: "Label 4" },
  { id: 13, name: "Label 4" },
  { id: 14, name: "Label 4" },
  { id: 15, name: "Label 4" },
  { id: 16, name: "Label 4" },
  { id: 17, name: "Label 4" },
  { id: 18, name: "Label 4" },
  { id: 19, name: "Label 4" },
  { id: 20, name: "Label 4" },
  { id: 21, name: "Label 4" }
];

const filters = [
  { id: 1, name: "Query 1", query: "" },
  { id: 2, name: "Query 2", query: "" },
  { id: 3, name: "Query 3", query: "" },
  { id: 4, name: "Query 4", query: "" },
  { id: 5, name: "Query 4", query: "" },
  { id: 6, name: "Query 4", query: "" }
];

const styles = { tasks: {} };

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      hovering: false,
      showChildren: true,
      editText: false
    };
  }

  handleChangeName = e => {
    this.setState({ name: e.target.value }, () => this.change());
  };

  handleClickRemove = () => {
    const { index, onRemove } = this.props;
    onRemove(index);
  };

  handleKeyDown = e => {
    if (e.key === "Enter") {
      const { index, onReturn } = this.props;
      onReturn(index);
    }
  };

  onMouseEnter = e => {
    e.stopPropagation();
    this.setHover(true);
  };

  onMouseLeave = e => {
    e.stopPropagation();
    this.setHover(false);
  };

  setHover = state => {
    this.setState({ hovering: state });
  };

  toggleShowChildren = e => {
    e.stopPropagation();
    this.setState({ showChildren: !this.state.showChildren });
  };

  enableNameEditing = () => {
    this.setState({ editText: true });
  };

  disableNameEditing = (save = true) => {
    this.setState({ editText: false });
  };

  hoverStyle = (on = 1, off = 0.5) => {
    return this.state.hovering ? { opacity: on } : { opacity: off };
  };

  render() {
    const {
      connectDragSource,
      connectDragPreview,
      connectDropTarget,
      isDragging,
      isClosestDragging,
      active,
      path,
      progress,
      name
    } = this.props;

    const progressDisabled = progress == null;
    const progressValue = !progressDisabled ? progress : 100;

    const inverted = false;
    const dragHandle = (
      <Ref innerRef={instance => connectDragSource(instance)}>
        <List.Icon
          className="dragHandle"
          name="arrows alternate vertical"
          color={isDragging ? "red" : null}
          style={{ ...this.hoverStyle(0.5, 0), cursor: "move" }}
          inverted={inverted}
        />
      </Ref>
    );

    return (
      <Ref
        innerRef={instance => {
          connectDropTarget(instance);
          connectDragPreview(instance);
        }}
      >
        <List.Item
          onMouseOver={this.onMouseEnter}
          onMouseOut={this.onMouseLeave}
          style={{ ...styles.task, paddingLeft: path.length * 20 }}
        >
          <List.Content>
            {dragHandle}

            <List.Content style={{ display: "inline" }}>
              <List.Header as="h5" style={{ display: "inline" }}>
                {name}
              </List.Header>
              <div style={{ ...this.hoverStyle(), float: "right" }}>
                <List.Icon name="calendar outline" inverted={inverted} />
                <List.Icon name="ellipsis vertical" inverted={inverted} />
              </div>
            </List.Content>

            <Progress
              style={{ marginLeft: 20 }}
              attached="bottom"
              percent={100}
              disabled={false}
              inverted={inverted}
              indicating={true}
            />
          </List.Content>
        </List.Item>
      </Ref>
    );
  }
}

const ITEMS = [
  { id: 1, name: "Test1", path: [] },
  { id: 2, name: "Test2", path: [] },
  { id: 3, name: "test3", path: [2] },
  { id: 4, name: "Test3", path: [2, 3] },
  { id: 5, name: "Test3", path: [] }
];

@inject("todoStore", "commonStore")
@observer
class TasksView extends Component {
  state = { items: ITEMS };

  renderItem = props => <Task {...props} />;

  handleChange = items => {
    this.setState({ items });
  };

  render() {
    // const { todoStore } = this.props;
    // const { tasks } = todoStore;
    // console.log(tasks);
    // const items = convert(tasks);
    // console.log(items);
    const { items } = this.state;
    return (
      <Container>
        <Grid inverted stackable>
          <Grid.Row style={{ padding: 0, marginTop: 14 }}>
            <Grid.Column width={4}>
              <ViewMenu />
              <DropdownMenu
                projects={projects}
                labels={labels}
                filters={filters}
              />
            </Grid.Column>

            <Grid.Column width={12}>
              <List relaxed>
                <Sortly
                  items={items}
                  itemRenderer={this.renderItem}
                  onChange={this.handleChange}
                />
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default TasksView;
