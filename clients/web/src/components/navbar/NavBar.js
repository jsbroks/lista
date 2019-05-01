import React, { Component } from "react";

import {
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Badge,
  Tooltip
} from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";

const TasksButton = props => {
  return (
    <Tooltip title="Tasks">
      <IconButton color="inherit">
        <Badge badgeContent={props.numberOfTasks} max={99} color="secondary">
          <AssignmentIcon fontSize="small" />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

class NavBar extends Component {
  render() {
    return (
      <AppBar>
        <Toolbar variant="dense">
          <Typography color="inherit">Lista</Typography>

          <div>
            <TasksButton numberOfTasks={10} />
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;
