import React, { Component } from "react";
import { Container, Grid, Segment } from "semantic-ui-react";

import ViewMenu from "../menus/ViewMenus";
import DropdownMenu from "../menus/DropdownMenus";
import TasksList from "../tasks/TasksList";

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

class TasksView extends Component {
  render() {
    return (
      <Container>
        <Grid inverted stackable>
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
              <TasksList />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default TasksView;
