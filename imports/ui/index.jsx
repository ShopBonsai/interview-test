// Framework
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Pages
import Admin from "./admin/index";
import StoreFront from "./storeFront/index";
import ProductsContainer from "./products/container";
import CartContainer from "./cart/container";
import faSetup from "../startup/client/faSetup";

// defint component
const Ui = () =>
  <div id="router">
    <BrowserRouter>
      <Switch>
        <Route exact path="/shop" component={ProductsContainer} />
        <Route exact path="/cart" component={CartContainer} />
      </Switch>
    </BrowserRouter>
  </div>;

// export component
export default Ui;
