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

class AppBar extends Component {
  render() {
    const { notifications } = this.props;
    return (
      <Menu icon secondary attached="top" style={styles.menu}>
        <Container>
          <Menu.Item header>
            <Header as="h2">Lista</Header>
          </Menu.Item>

          <Menu.Item name="icon menu" position="right">
            <Button circular icon style={styles.button}>
              <Icon name="add" />
            </Button>
            <Button circular icon style={styles.button}>
              <Icon name="tasks" />
              {notifications ? (
                <Label color="red" circular floating size="tiny">
                  {notifications}
                </Label>
              ) : null}
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
