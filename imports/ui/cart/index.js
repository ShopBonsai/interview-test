// Framework
import React, { PureComponent } from "react";
import CartComp from "./comp";

// define component
class Cart extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    document.title = "Your Cart";
  }
  viewAll(event) {
    event.preventDefault();
    const { currentTarget } = event;
  }
  render() {
    return React.createElement(CartComp, {});
  }
}

// export component
export default Cart;
