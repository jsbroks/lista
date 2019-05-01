import React, { Component } from "react";
import Popper from "@material-ui/core/Popper";

import AccountCircle from "@material-ui/icons/AccountCircle";
import { Paper, MenuList, IconButton, Typography } from "@material-ui/core";

const UserMenu = props => {
  return (
    <Paper>
      <MenuList>
        <Typography>{props.name}</Typography>
      </MenuList>
    </Paper>
  );
};

class UserButton extends Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = () => {};

  render() {
    const { open } = this.state;

    return (
      <div>
        <IconButton color="inherit">
          <AccountCircle fontSize="small" />
        </IconButton>
        <Popper>
          <UserMenu name="James" />
        </Popper>
      </div>
    );
  }
}

export default UserButton;
