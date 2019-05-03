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

const styles = {
  button: {
    marginRight: 5
  }
};
class AppBar extends Component {
  render() {
    const { notifications } = this.props;
    return (
      <Menu icon secondary>
        <Container>
          <Menu.Item header>
            <Header>Lista</Header>
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
    );
  }
}

AppBar.protoTypes = {
  notifications: PropTypes.number.isRequired
};

export default AppBar;
