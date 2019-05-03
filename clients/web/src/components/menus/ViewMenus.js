import React, { Component } from "react";

import { Menu, Icon, Label } from "semantic-ui-react";

class ViewMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDayTime: true
    };
  }

  updateDayState = () => {
    const hours = new Date().getHours();
    this.setState({ isDayTime: hours > 6 && hours < 20 });
  };

  componentDidMount() {
    this.updateDayState();
    setInterval(() => {
      this.updateDayState();
    }, 10 * 60 * 1000);
  }
  render() {
    const { isDayTime } = this.state;

    return (
      <Menu vertical secondary fluid pointing size="large">
        <Menu.Item active={true}>
          <Icon name="inbox" />
          Inbox
        </Menu.Item>
        <Menu.Item>
          <Icon name={isDayTime ? "sun" : "moon"} />
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
