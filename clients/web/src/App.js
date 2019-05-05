import React, { Component } from "react";

import { Container, Grid, List } from "semantic-ui-react";

import AppBar, { APPBAR_HEIGHT } from "./components/AppBar";
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
  { id: 4, name: "Label 4" },
  { id: 5, name: "Label 4" },
  { id: 6, name: "Label 4" },
  { id: 7, name: "Label 4" },
  { id: 8, name: "Label 4" },
  { id: 9, name: "Label 4" },
  { id: 10, name: "Label 4" },
  { id: 11, name: "Label 4" },
  { id: 12, name: "Label 4" },
  { id: 13, name: "Label 4" },
  { id: 14, name: "Label 4" },
  { id: 15, name: "Label 4" },
  { id: 16, name: "Label 4" },
  { id: 17, name: "Label 4" },
  { id: 18, name: "Label 4" },
  { id: 19, name: "Label 4" },
  { id: 20, name: "Label 4" },
  { id: 21, name: "Label 4" }
];

const filters = [
  { id: 1, name: "Query 1", query: "" },
  { id: 2, name: "Query 2", query: "" },
  { id: 3, name: "Query 3", query: "" },
  { id: 4, name: "Query 4", query: "" },
  { id: 5, name: "Query 4", query: "" },
  { id: 6, name: "Query 4", query: "" }
];

const styles = {
  taskView: {
    paddingTop: 20,
    paddingBottom: 20,
    height: `calc(100vh - ${APPBAR_HEIGHT}px)`,
    overflowY: "auto"
  }
};

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <AppBar />
        <Container>
          <Grid columns={2}>
            <Grid.Row style={{ padding: 0, marginTop: 14 }}>
              <Grid.Column width={4}>
                <ViewMenu />
                <DropdownMenu
                  projects={projects}
                  labels={labels}
                  filters={filters}
                />
              </Grid.Column>

              <Grid.Column width={12}>
                <List style={styles.taskView}>
                  {tasks.map(t => (
                    <Task key={t.id} {...t} />
                  ))}
                </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
