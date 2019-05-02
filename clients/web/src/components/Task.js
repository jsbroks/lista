import React, { Component } from "react";
import PropTypes from "prop-types";

import { Label, List, Progress } from "semantic-ui-react";

const styles = {
  projectIcon: {
    marginRight: 5
  },
  subList: {
    paddingLeft: 20
  },
  progressBar: {
    height: 4
  },
  taskText: {
    display: "inline"
  }
};

const ProjectIcon = props => {
  const { project } = props;
  return (
    <List.Content floated="right">
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
      showChildren: true
    };
  }

  toggleHover = e => {
    e.stopPropagation();
    this.setState({ hovering: !this.state.hovering });
  };

  toggleShowChildren = e => {
    e.stopPropagation();
    this.setState({ showChildren: !this.state.showChildren });
  };

  hoverStyle = () => {
    return this.state.hovering ? { opacity: 1 } : { opacity: 0.6 };
  };

  render() {
    const { name, project, children, progress, isChild } = this.props;
    const { showChildren, hovering } = this.state;

    const hasChildren = children && children.length > 0;
    const progressDisabled = progress == null;
    const progressValue = !progressDisabled ? progress : 100;

    return (
      <List.Item
        onMouseOver={this.toggleHover}
        onMouseOut={this.toggleHover}
        style={styles.task}
      >
        <List.Content>
          <List.Content floated="right" style={this.hoverStyle()}>
            <List.Icon name="calendar" />
            <List.Icon name="ellipsis vertical" />
          </List.Content>
          {project && !isChild ? <ProjectIcon project={project} /> : null}
          <List.Content as="div">
            {hasChildren ? (
              <List.Icon
                style={this.hoverStyle()}
                name={`triangle ${showChildren ? "down" : "right"}`}
                onClick={this.toggleShowChildren}
              />
            ) : null}
            <List.Icon
              name={`${hovering ? "check " : ""}circle outline`}
              style={this.hoverStyle()}
            />
            <List.Header as="p" style={styles.taskText}>
              {name}
            </List.Header>
          </List.Content>
        </List.Content>

        <Progress
          as="div"
          percent={progressValue}
          attached="bottom"
          disabled={progressDisabled}
          style={styles.progressBar}
          indicating={hovering && !progressDisabled}
        />

        {hasChildren ? (
          <List.List
            as="div"
            style={{
              ...styles.subList,
              display: showChildren ? "block" : "none"
            }}
          >
            {children.map(task => (
              <Task key={task.id} {...task} isChild={true} />
            ))}
          </List.List>
        ) : null}
      </List.Item>
    );
  }
}

Task.protoTypes = {
  name: PropTypes.string.isRequired,
  project: PropTypes.string,
  duration: PropTypes.number,
  percent: PropTypes.number,
  isChild: PropTypes.bool
};

export default Task;
