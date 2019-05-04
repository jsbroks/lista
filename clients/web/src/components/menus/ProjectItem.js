import React, { Component } from "react";
import PropTypes from "prop-types";
import { TwitterPicker } from "react-color";

import { Icon, Input, List, Popup } from "semantic-ui-react";

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
  },
  popover: { margin: 0, padding: 0, outline: 0, boxShadow: "none" }
};

class ProjectItem extends Component {
  render() {
    const icon = (
      <Icon
        name="circle"
        color={this.props.color}
        style={{ padding: 10 }}
        size="mini"
      />
    );
    return (
      <div>
        <List.Item style={styles.removeSpacing}>
          <Input type="text" fluid>
            <Popup on="click" trigger={icon} basic style={styles.popover}>
              <TwitterPicker triangle="hide" />
            </Popup>

            <input style={styles.input} value={this.props.name} />
          </Input>
        </List.Item>
      </div>
    );
  }
}

export default ProjectItem;
