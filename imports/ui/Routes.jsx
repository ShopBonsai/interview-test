// @flow

// Framework
import React from "react";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

// Pages
import ReturnsPage from "./pages/ReturnsPage.jsx";

const Routes = () =>
  <BrowserRouter>
    <Route exact path="/" component={ReturnsPage} />
  </BrowserRouter>;

export default Routes;
