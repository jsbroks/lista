import React, { Component } from "react";

import { Switch, Route, withRouter } from "react-router-dom";

import AppBar from "./components/AppBar";
import TasksView from "./components/views/TasksView";
import LoginView from "./components/views/LoginView";

@withRouter
class App extends Component {
  render() {
    return (
      <div>
        <AppBar />
        <Switch>
          <Route exact path="/login" component={LoginView} />
          <Route exact path="/" component={TasksView} />
        </Switch>
      </div>
    );
  }
}

export default App;
