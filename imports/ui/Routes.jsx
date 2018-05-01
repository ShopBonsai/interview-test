// Framework
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  browserHistory
} from "react-router-dom";

// Pages
import Shop from "./pages/Shop.jsx";
import Home from "./pages/Home.jsx";
import ThankYou from "./pages/ThankYou.jsx";

const Routes = () =>
  <Router history={browserHistory}>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/shop" component={Shop} />
      <Route exact path="/shop/thank-you" component={ThankYou} />
    </div>
  </Router>;

export default Routes;
