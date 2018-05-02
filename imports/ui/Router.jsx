// Framework
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Pages
import Admin from "./admin/index";
import Store from "./store/index";

// defint component
const Router = () =>
  <div id="router">
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Store} />
        <Route exact path="/admin" component={Admin} />
      </Switch>
    </BrowserRouter>
  </div>

// export component
export default Router;
