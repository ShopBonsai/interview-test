// Framework
import React, { PureComponent } from "react";
import SummaryComp from "./comp";

// define component
class Summary extends PureComponent {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler(event) {
    event.preventDefault();
    const { currentTarget } = event;
    console.log(currentTarget);
  }
  render() {
    return React.createElement(SummaryComp, {
      cartItems: this.props.cartItems,
      products: this.props.products,
      clickHandler: this.clickHandler
    });
  }
}

// export component
export default Summary;
