// Framework
import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  browserHistory
} from "react-router-dom";
import Store from "./store";

// Pages
import Shop from "./pages/Shop.jsx";
import Home from "./pages/Home.jsx";
import Checkout from "./pages/Checkout.jsx";

const Routes = () =>
  <Provider store={Store}>
    <Router history={browserHistory}>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/checkout" component={Checkout} />
      </div>
    </Router>
  </Provider>;

export default Routes;
