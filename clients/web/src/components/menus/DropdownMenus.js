import React, { Component } from "react";

import { Accordion, Icon, List, Button } from "semantic-ui-react";

import MenuItem from "./MenuItem";

const styles = {
  removePadding: {
    padding: 0
  }
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
              <MenuItem
                key={p.id}
                {...p}
                icon={{
                  name: "circle",
                  color: p.color,
                  style: { padding: 10 }
                }}
              />
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
              <MenuItem
                key={l.id}
                {...l}
                icon={{
                  name: "tag",
                  size: "mini",
                  style: { padding: 10 }
                }}
              />
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
