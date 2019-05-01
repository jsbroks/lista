import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

const styles = theme => ({
  layout: {
    width: "auto",
    marginTop: 50,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
});

class Layout extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.layout}>
        <Grid container spacing={24}>
          <Grid item xs={4}>
            Left Menu
          </Grid>
          <Grid item xs={8}>
            Right Menu
          </Grid>
        </Grid>
      </div>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Layout);
