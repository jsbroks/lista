import React, { Component } from "react";
import {
  Button,
  Container,
  Header,
  Icon,
  Menu,
  Label
} from "semantic-ui-react";

class AppBar extends Component {
  render() {
    return (
      <Menu icon secondary>
        <Container>
          <Menu.Item header>
            <Header>Lista</Header>
          </Menu.Item>

          <Menu.Item name="icon menu" position="right">
            <Button circular icon style={{ marginRight: 5 }}>
              <Icon name="add" />
            </Button>
            <Button circular icon style={{ marginRight: 5 }}>
              <Icon name="tasks" />
              <Label color="red" circular floating size="tiny">
                22
              </Label>
            </Button>
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

export default AppBar;
