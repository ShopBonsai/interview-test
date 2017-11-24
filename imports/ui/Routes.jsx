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

const Routes = () =>
  <Provider store={Store}>
    <Router history={browserHistory}>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/shop" component={Shop} />
      </div>
    </Router>
  </Provider>;

export default Routes;
