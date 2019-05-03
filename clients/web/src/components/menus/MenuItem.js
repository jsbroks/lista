import React, { Component } from "react";
import PropTypes from "prop-types";

import { List, Input, Icon } from "semantic-ui-react";

const styles = {
  projectIcon: {
    marginRight: 4
  },
  circleIcon: {
    padding: 10
  },
  input: {
    padding: 3,
    outline: 0,
    border: 0,
    background: "transparent"
  },
  removeSpacing: {
    padding: 0,
    margin: 0
  }
};

class ProjectListItem extends Component {
  render() {
    const { name, icon } = this.props;

    return (
      <List.Item style={styles.removeSpacing}>
        <Input type="text" fluid>
          <Icon {...icon} />
          <input style={styles.input} value={name} />
        </Input>
      </List.Item>
    );
  }
}

ProjectListItem.protoTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.object
};

export default ProjectListItem;
