import React, { Component } from "react";

import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Menu,
  Label,
  Accordion,
  List,
  Progress
} from "semantic-ui-react";

class App extends Component {
  render() {
    return (
      <div>
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

        <Container>
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column width={4} fluid>
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

                <Accordion>
                  <Accordion.Title>
                    <Icon name="dropdown" />
                    Projects
                  </Accordion.Title>
                  <Accordion.Title>
                    <Icon name="dropdown" />
                    Labels
                  </Accordion.Title>
                  <Accordion.Title>
                    <Icon name="dropdown" />
                    Filters
                  </Accordion.Title>
                </Accordion>
              </Grid.Column>

              <Grid.Column width={12}>
                <List selection>
                  <List.Item>
                    <List.Content floated="right">
                      <List.Icon name="ellipsis vertical" position="right" />
                    </List.Content>
                    <List.Content floated="right">
                      <Label size="mini" circular>
                        <Icon name="circle" color="red" /> Indox
                      </Label>
                    </List.Content>

                    <List.Icon
                      name="sort"
                      size="small"
                      style={{ paddingRight: 10 }}
                      verticalAlign="middle"
                    />
                    <List.Icon name="circle outline" verticalAlign="middle" />
                    <List.Content>
                      <List.Header>Some Random Task</List.Header>
                    </List.Content>
                  </List.Item>
                  <Progress percent={100} attached="bottom" />
                </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
