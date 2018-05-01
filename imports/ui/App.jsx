// Framework
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Pages
import Home from "./home/index";

// defint component
const Router = () =>
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </BrowserRouter>;

// export component
export default Router;
