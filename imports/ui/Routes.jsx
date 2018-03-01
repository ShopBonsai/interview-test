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
import Filter from "./pages/Filter.jsx";

const Routes = () =>
  <Router history={browserHistory}>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/shop/:keyword/:minPrice/:maxPrice" component={Shop} />
      <Route exact path="/shop" component={Shop} />
      <Route path="/search/filter/:keyword/:minPrice/:maxPrice" component={Filter} />
    </div>
  </Router>;

export default Routes;
