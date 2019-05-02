import React, { Component } from "react";

import { Accordion, Icon, List } from "semantic-ui-react";

import Project from "../Project";

class DropdownMenu extends Component {
  render() {
    const { projects } = this.props;
    return (
      <Accordion>
        <Accordion.Title active={true}>
          <Icon name="dropdown" />
          Projects
        </Accordion.Title>
        <Accordion.Content active={true}>
          <List>
            {projects.map(p => (
              <Project key={p.id} {...p} />
            ))}
          </List>
        </Accordion.Content>
        <Accordion.Title>
          <Icon name="dropdown" />
          Labels
        </Accordion.Title>
        <Accordion.Title>
          <Icon name="dropdown" />
          Filters
        </Accordion.Title>
      </Accordion>
    );
  }
}

export default DropdownMenu;
