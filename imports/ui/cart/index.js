// Framework
import React, { Component } from "react";
import CartComp from "./comp";

// define component
class Cart extends Component {
  componentDidMount() {
    document.title = "Shopping SmartCart at Bonsai";
  }
  render() {
    return React.createElement(CartComp, {});
  }
}

// export component
export default Cart;
