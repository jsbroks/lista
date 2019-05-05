import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Container,
  Header,
  Icon,
  Menu,
  Label
} from "semantic-ui-react";
import { inject, observer } from "mobx-react";
import { If } from "./helpers";

export const APPBAR_HEIGHT = 60;

const styles = {
  button: {
    marginRight: 5
  },
  menu: {
    background: "white",
    height: APPBAR_HEIGHT
  }
};

@inject("commonStore")
@observer
class AppBar extends Component {
  render() {
    const { notifications, commonStore } = this.props;
    return (
      <Menu icon secondary attached="top" style={styles.menu}>
        <Container>
          <Menu.Item header>
            <Header as="h2">{commonStore.name}</Header>
          </Menu.Item>

          <Menu.Item name="icon menu" position="right">
            <Button circular icon style={styles.button}>
              <Icon name="add" />
            </Button>
            <Button circular icon style={styles.button}>
              <Icon name="tasks" />
              <If condition={notifications}>
                <Label color="red" circular floating size="tiny">
                  {notifications}
                </Label>
              </If>
            </Button>
            <Button circular icon style={styles.button}>
              <Icon name="user" />
            </Button>
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

AppBar.protoTypes = {
  notifications: PropTypes.number.isRequired
};

export default AppBar;
