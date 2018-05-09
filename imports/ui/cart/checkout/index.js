// Framework
import React, { PureComponent } from "react";
import CheckoutComp from "./comp";

// define component
class Checkout extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement(CheckoutComp, {});
  }
}

// export component
export default Checkout;
