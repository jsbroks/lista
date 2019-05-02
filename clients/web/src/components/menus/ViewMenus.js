import React, { Component } from "react";

import { Menu, Icon, Label } from "semantic-ui-react";

class ViewMenu extends Component {
  render() {
    return (
      <Menu vertical secondary fluid>
        <Menu.Item>
          <Icon name="inbox" />
          Inbox
        </Menu.Item>
        <Menu.Item>
          <Icon name="sun" />
          <Label size="tiny">22</Label>
          Today
        </Menu.Item>
        <Menu.Item>
          <Icon name="calendar" />
          Week
        </Menu.Item>
        <Menu.Item>
          <Icon name="calendar alternate" />
          Calandar
        </Menu.Item>
      </Menu>
    );
  }
}

export default ViewMenu;
