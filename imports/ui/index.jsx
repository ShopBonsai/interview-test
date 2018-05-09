// Framework
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Pages
import Admin from "./admin/index";
import Home from "./home/index";
import ShopContainer from "./shop/container";
import Cart from "./cart";
import faSetup from "../startup/client/faSetup";

// defint component
const Ui = () =>
  <div id="router">
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/shop" component={ShopContainer} />
        <Route exact path="/cart" component={Cart} />
      </Switch>
    </BrowserRouter>
  </div>;

// export component
export default Ui;
