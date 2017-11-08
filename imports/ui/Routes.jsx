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
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Cart from './pages/Cart.jsx';
const Routes = () =>
  <Router history={browserHistory}>
    <div>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/cart" component={Cart} />
      <Route exact path="/" component={Home} />
      <Route path="/shop" component={Shop} />
    </div>
  </Router>;

export default Routes;
