import React, { Component } from "react";

import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import AppBar from "./components/AppBar";
import TasksView from "./components/views/TasksView";
import LoginView from "./components/views/LoginView";
import { inject, observer } from "mobx-react";

import HTML5Backend from "react-dnd-html5-backend";

import { DragDropContextProvider } from "react-dnd";

import { If } from "./components/helpers";

const ConditionRoute = ({ condition, to, ...rest }) => {
  return (
    <If
      condition={condition}
      isTrue={<Route {...rest} />}
      isFalse={<Redirect to={to} />}
    />
  );
};

@inject("userStore")
@observer
class LoginRoute extends Component {
  render() {
    const { userStore, ...rest } = this.props;

    const condition = {
      ...rest,
      condition: !userStore.isAuthenticated || userStore.loadingUser,
      to: { pathname: "/" }
    };

    return <ConditionRoute {...condition} />;
  }
}

@inject("userStore")
@observer
class PrivateRoute extends Component {
  render() {
    const { userStore, path, ...rest } = this.props;

    const condition = {
      ...rest,
      condition: userStore.isAuthenticated || userStore.loadingUser,
      to: { pathname: "/login", state: { from: path } }
    };

    return <ConditionRoute {...condition} />;
  }
}

@withRouter
@inject("commonStore")
@observer
class App extends Component {
  render() {
    const { commonStore } = this.props;

    const inverted = commonStore.inverted;
    const style = {
      background: inverted ? "#1B1C1D" : "white",
      height: "100vh"
    };

    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div style={style}>
          <AppBar />
          <Switch>
            <PrivateRoute exact path="/" component={TasksView} />
            <Redirect from="/tasks" to="/" />
            <LoginRoute path="/login" component={LoginView} />
          </Switch>
        </div>
      </DragDropContextProvider>
    );
  }
}

export default App;
