import React from "react";
import ReactDOM from "react-dom";

import { configure } from "mobx";
import { Provider } from "mobx-react";
import { HashRouter } from "react-router-dom";

import App from "./App";
import stores from "./stores";

import "./index.css";

// For easier debugging
window.APP_STATE = stores;

configure({
  enforceActions: "always"
});

ReactDOM.render(
  <Provider {...stores}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
