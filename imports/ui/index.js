// Framework
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Pages
import Cart from "./cart";
import Admin from "./admin/index";
import Home from "./home/index";
import ShopContainer from "./shop/container";
import ModalContainer from "./common/modal/container";
import faSetup from "../startup/client/faSetup";

// defint component
const Ui = ({ ...props }) => {
  if (props.modalStatus) {
    return <ModalContainer />;
  }
  return (
    <div id="router">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/shop" component={ShopContainer} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/admin" component={Admin} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

// export component
export default Ui;
