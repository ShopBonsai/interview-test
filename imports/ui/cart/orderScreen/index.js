// Framework
import React, { PureComponent } from "react";
import OrderScreenComp from "./comp";

// define component
class OrderScreen extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement(OrderScreenComp, {});
  }
}

// export component
export default OrderScreen;
