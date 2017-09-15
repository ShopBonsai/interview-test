// @flow

// Framework
import React from "react";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

// Redux
import configureStore from "./redux/store";

// Pages
import ReturnsPage from "./pages/ReturnsPage.jsx";

const Routes = () =>
  <BrowserRouter store={configureStore()}>
    <Route exact path="/" component={ReturnsPage} />
  </BrowserRouter>;

export default Routes;
