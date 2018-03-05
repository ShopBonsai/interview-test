// Framework
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Pages
import Shop from "./pages/Shop.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
const Routes = () =>
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/cart" component={Cart} />
    </div>
  </Router>;

export default Routes;
