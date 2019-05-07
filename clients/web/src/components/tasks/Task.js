import React, { Component } from "react";
import PropTypes from "prop-types";
import TextareaAutosize from "react-autosize-textarea";

import { Label, List, Progress } from "semantic-ui-react";
import TaskComments from "./TaskComments";
import { If, Show } from "../helpers";

const styles = {
  projectIcon: {
    marginRight: 5
  },
  subList: {
    paddingLeft: 20
  },
  taskText: {
    display: "inline"
  },
  taskInput: {
    outline: 0,
    border: 0,
    background: "transparent",
    resize: "none",
    width: "100%"
  }
};

const ProjectIcon = props => {
  const { project, inverted } = props;
  return (
    <List.Content
      floated="right"
      style={{ color: inverted ? "lightgray" : "darkgray" }}
    >
      <Label
        size="mini"
        color="red"
        circular
        empty
        as="span"
        style={styles.projectIcon}
      />
      {project}
    </List.Content>
  );
};

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false,
      showChildren: true,
      editText: false
    };
  }

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
    const { name, project, children, progress, isChild, inverted } = this.props;
    const { showChildren, hovering, editText } = this.state;

    const hasChildren = children && children.length > 0;

    const progressDisabled = progress == null;
    const progressValue = !progressDisabled ? progress : 100;

    return (
      <List.Item
        as="div"
        onMouseOver={this.onMouseEnter}
        onMouseOut={this.onMouseLeave}
        style={styles.task}
      >
        <If
          condition={editText}
          isTrue={
            <List.Content>
              <TextareaAutosize
                innerRef={ref => (this.textarea = ref)}
                style={styles.taskInput}
                autoFocus
                onBlur={this.disableNameEditing}
                value={name}
              />
            </List.Content>
          }
          isFalse={
            <List.Content>
              <List.Content floated="right" style={this.hoverStyle()}>
                <List.Icon name="calendar outline" inverted={inverted} />
                <List.Icon name="ellipsis vertical" inverted={inverted} />
              </List.Content>

              <If condition={project && !isChild}>
                <ProjectIcon project={project} />
              </If>

              <List.Content>
                <If condition={hasChildren}>
                  <List.Icon
                    style={this.hoverStyle()}
                    name={`triangle ${showChildren ? "down" : "right"}`}
                    onClick={this.toggleShowChildren}
                    inverted={inverted}
                  />
                </If>

                <List.Icon
                  name={`${hovering ? "check " : ""}circle outline`}
                  style={this.hoverStyle()}
                  inverted={inverted}
                />

                <List.Header
                  style={styles.taskText}
                  onClick={this.enableNameEditing}
                >
                  {name}
                </List.Header>

                <TaskComments
                  iconStyle={this.hoverStyle()}
                  setHover={this.setHover}
                  inverted={inverted}
                />
              </List.Content>
            </List.Content>
          }
        />

        <Progress
          attached="bottom"
          percent={progressValue}
          disabled={progressDisabled}
          indicating={(hovering || editText) && !progressDisabled}
          inverted={inverted}
        />

        <If condition={hasChildren}>
          <Show condition={showChildren}>
            <List.List as="div" style={styles.subList}>
              {(children || []).map(task => (
                <Task
                  key={task.id}
                  {...task}
                  isChild={true}
                  inverted={inverted}
                />
              ))}
            </List.List>
          </Show>
        </If>
      </List.Item>
    );
  }
}

Task.protoTypes = {
  name: PropTypes.string.isRequired,
  project: PropTypes.string,
  duration: PropTypes.number,
  percent: PropTypes.number,
  isChild: PropTypes.bool,
  inverted: PropTypes.bool
};

export default Task;
