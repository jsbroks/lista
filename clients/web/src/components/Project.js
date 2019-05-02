import React, { Component } from "react";
import PropTypes from "prop-types";

import { List } from "semantic-ui-react";

const styles = {
  projectIcon: {
    marginRight: 4
  }
};

class ProjectListItem extends Component {
  render() {
    const { name, color } = this.props;
    return (
      <List.Item>
        <List.Icon
          size="tiny"
          color={color}
          name="circle"
          verticalAlign="middle"
          style={styles.projectIcon}
        />
        {name}
      </List.Item>
    );
  }
}

ProjectListItem.protoTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default ProjectListItem;
