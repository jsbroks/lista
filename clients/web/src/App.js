import React from "react";
import "./App.css";

import NavBar from "./components/navbar/NavBar";
import Layout from "./components/Layout";
import { CssBaseline } from "@material-ui/core";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <Layout />
    </React.Fragment>
  );
}

export default App;
