// Framework
import React, { Component } from "react";
import { Router, Route } from "react-router-dom";

// Pages
import ShopContainer from "./containers/ShopContainer.jsx";
import Home from "./pages/Home.jsx";

class Routes extends Component {
  render() {
    return (
      <Router history={this.props.history}>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/shop" component={ShopContainer} />
        </div>
      </Router>
    );
  }
}

export default Routes;
