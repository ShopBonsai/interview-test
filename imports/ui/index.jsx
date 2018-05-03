// Framework
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Pages
import Admin from "./admin/index";
import StoreFront from "./storeFront/index";
import Products from "./products/index";

// defint component
const Ui = () =>
  <div id="router">
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={StoreFront} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/admin" component={Admin} />
      </Switch>
    </BrowserRouter>
  </div>;

// export component
export default Ui;
