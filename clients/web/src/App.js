import React, { Component } from "react";

import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import AppBar from "./components/AppBar";
import TasksView from "./components/views/TasksView";
import LoginView from "./components/views/LoginView";
import { inject, observer } from "mobx-react";

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
class App extends Component {
  render() {
    return (
      <div>
        <AppBar />
        <Switch>
          <PrivateRoute exact path="/" component={TasksView} />
          <Redirect from="/tasks" to="/" />
          <LoginRoute path="/login" component={LoginView} />
        </Switch>
      </div>
    );
  }
}

export default App;
