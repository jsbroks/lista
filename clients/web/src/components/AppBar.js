import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import { If } from "./helpers";

import {
  Button,
  Container,
  Header,
  Icon,
  Menu,
  Label,
  Image,
  Popup
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

@inject("commonStore", "userStore")
@observer
class AppBar extends Component {
  render() {
    const { notifications, commonStore, userStore } = this.props;
    return (
      <Menu icon secondary attached="top" style={styles.menu}>
        <Container>
          <Menu.Item header>
            <Header as="h2">{commonStore.name}</Header>
          </Menu.Item>
          {userStore.isAuthenticated ? (
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

              <Popup
                trigger={
                  <Button style={styles.button} icon circular>
                    <Icon name="user" />
                  </Button>
                }
                on="click"
                hideOnScroll
                flowing
                hoverable
              >
                <Popup.Header>
                  <Image src={userStore.user.avatar} avatar />
                  <p style={{ display: "inline", paddingLeft: 10 }}>
                    {userStore.user.displayName}
                  </p>
                </Popup.Header>
                <Popup.Content />
                <Popup.Content>
                  <Button.Group
                    vertical
                    labeled
                    icon
                    fluid
                    basic
                    style={{ border: 0 }}
                  >
                    <Button icon="settings" content="Settings" />
                    <Button icon="sign-out" content="Logout" />
                  </Button.Group>
                </Popup.Content>
              </Popup>
            </Menu.Item>
          ) : null}
        </Container>
      </Menu>
    );
  }
}

AppBar.protoTypes = {
  notifications: PropTypes.number.isRequired
};

export default AppBar;
