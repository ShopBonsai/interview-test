// Framework
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  browserHistory
} from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

import { LikedProducts } from "../api/likedProducts/collection";
// Pages
import Shop from "./pages/Shop.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";

const Routes = () =>
  <Router history={browserHistory}>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/profile" component={Profile} />
    </div>
  </Router>;

export default Routes;
