import React, { Component } from "react";

import { Accordion, Icon, List, Button } from "semantic-ui-react";

import MenuItem from "./MenuItem";
import ProjectItem from "./ProjectItem";

const styles = {
  removePadding: {
    padding: 0
  }
};

const LabelItem = props => {
  return (
    <MenuItem
      {...props}
      icon={{
        size: "small",
        name: "tag",
        style: { padding: 6 },
        color: "gray"
      }}
    />
  );
};

class DropdownMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showProjects: false,
      showLabels: false,
      showFilters: false
    };
  }

  onProjectClick = () => {
    this.setState({ showProjects: !this.state.showProjects });
  };

  onFilterClick = () => {
    this.setState({ showFilters: !this.state.showFilters });
  };

  onLabelClick = () => {
    this.setState({ showLabels: !this.state.showLabels });
  };

  render() {
    const { projects, labels } = this.props;
    const { showProjects, showFilters, showLabels } = this.state;

    return (
      <Accordion fluid>
        <Accordion.Title active={showProjects} onClick={this.onProjectClick}>
          <Icon name="dropdown" />
          Projects
        </Accordion.Title>
        <Accordion.Content active={showProjects} style={styles.removePadding}>
          <List selection>
            {projects.map(p => (
              <ProjectItem key={p.id} {...p} />
            ))}
            <List.Item>
              <Button basic fluid size="mini" style={{ padding: 4 }}>
                New project
              </Button>
            </List.Item>
          </List>
        </Accordion.Content>

        <Accordion.Title active={showLabels} onClick={this.onLabelClick}>
          <Icon name="dropdown" />
          Labels
        </Accordion.Title>
        <Accordion.Content active={showLabels} style={styles.removePadding}>
          <List selection>
            {labels.map(l => (
              <LabelItem key={l.id} {...l} />
            ))}
            <List.Item>
              <Button basic fluid size="mini" style={{ padding: 4 }}>
                New label
              </Button>
            </List.Item>
          </List>
        </Accordion.Content>

        <Accordion.Title active={showFilters} onClick={this.onFilterClick}>
          <Icon name="dropdown" />
          Filters
        </Accordion.Title>
        <Accordion.Content active={showFilters} style={styles.removePadding}>
          <List selection>
            <List.Item>
              <Button basic fluid size="mini" style={{ padding: 4 }}>
                New filter
              </Button>
            </List.Item>
          </List>
        </Accordion.Content>
      </Accordion>
    );
  }
}

export default DropdownMenu;
