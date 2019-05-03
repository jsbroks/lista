import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Container,
  Header,
  Icon,
  Menu,
  Label,
  Sticky
} from "semantic-ui-react";

const styles = {
  button: {
    marginRight: 5
  },
  menu: {
    background: "white"
  }
};
class AppBar extends Component {
  render() {
    const { notifications } = this.props;
    return (
      <Sticky>
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
            </Menu.Item>
          </Container>
        </Menu>
      </Sticky>
    );
  }
}

AppBar.protoTypes = {
  notifications: PropTypes.number.isRequired
};

export default AppBar;
