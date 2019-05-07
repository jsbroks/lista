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
import { NONAME } from "dns";

export const APPBAR_HEIGHT = 60;

const styles = {
  button: {
    marginRight: 5
  },
  menu: {
    height: APPBAR_HEIGHT
  }
};

@inject("commonStore", "userStore")
@observer
class AppBar extends Component {
  render() {
    const { notifications, commonStore, userStore } = this.props;

    const inverted = commonStore.inverted;

    return (
      <Menu inverted={inverted} attached="top" className="borderless">
        <Container>
          <Menu.Item header style={styles.removeOutline}>
            <Header as="h2" inverted={inverted}>
              {commonStore.name}
            </Header>
          </Menu.Item>
          {userStore.isAuthenticated ? (
            <Menu.Item name="icon menu" position="right">
              <Button circular icon style={styles.button} inverted={inverted}>
                <Icon name="add" />
              </Button>
              <Button circular icon style={styles.button} inverted={inverted}>
                <Icon name="tasks" />
                <If condition={notifications}>
                  <Label color="red" circular floating size="tiny">
                    {notifications}
                  </Label>
                </If>
              </Button>

              <Popup
                trigger={
                  <Button
                    style={styles.button}
                    icon
                    circular
                    inverted={inverted}
                  >
                    <Icon name="user" />
                  </Button>
                }
                on="click"
                hideOnScroll
                flowing
                hoverable
                inverted={inverted}
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
                    inverted={inverted}
                  >
                    <Button icon="settings" content="Settings" />
                    <Button icon="sign-out" content="Logout" />
                  </Button.Group>
                </Popup.Content>
              </Popup>
              <Button
                circular
                icon
                style={styles.button}
                inverted={inverted}
                onClick={commonStore.toggleInverted}
              >
                <Icon name={inverted ? "moon" : "sun"} />
              </Button>
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
