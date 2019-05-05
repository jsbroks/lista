import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

import { configure } from "mobx";
import { Provider } from "mobx-react";

import todoStore from "./stores/todoStore";
import commonStore from "./stores/commonStore";
import userStore from "./stores/userStore";

const stores = { todoStore, commonStore, userStore };

// For easier debugging
window.APP_STATE = stores;

configure({
  enforceActions: "always"
});

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById("root")
);
