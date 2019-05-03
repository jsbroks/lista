import React, { Component } from "react";

import { Container, Grid, List } from "semantic-ui-react";

import AppBar from "./components/AppBar";
import Task from "./components/Task";
import ViewMenu from "./components/menus/ViewMenus";
import DropdownMenu from "./components/menus/DropdownMenus";

const tasks = [
  {
    id: 1,
    name: "task1",
    project: "project1",
    children: [
      {
        id: 2,
        name: "subtask1",
        project: "project2",
        progress: 20
      },
      {
        id: 3,
        name: "subtask2",
        project: "project3",
        progress: 100
      }
    ]
  },
  {
    id: 5,
    name: "task2",
    project: "project1",
    children: [
      {
        id: 6,
        name: "subtask1",
        project: "project2",
        progress: 90,
        children: [
          {
            id: 7,
            name: "subsubtask1",
            project: "project3",
            progress: 20
          }
        ]
      }
    ]
  }
];

const projects = [
  { id: 1, color: "red", name: "project1 test" },
  { id: 2, color: "green", name: "project2 test" },
  { id: 3, color: "black", name: "project3 test" }
];

const labels = [
  { id: 1, name: "Label 1" },
  { id: 2, name: "Label 2" },
  { id: 3, name: "Label 3" },
  { id: 4, name: "Label 4" }
];

class App extends Component {
  render() {
    return (
      <div>
        <AppBar />
        <Container>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column width={4}>
                <ViewMenu />
                <DropdownMenu projects={projects} labels={labels} />
              </Grid.Column>

              <Grid.Column width={12}>
                <List>
                  {tasks.map(t => (
                    <Task {...t} />
                  ))}
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
