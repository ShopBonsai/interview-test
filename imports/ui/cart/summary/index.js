// Framework
import React, { PureComponent } from "react";
import SummaryComp from "./comp";

// define component
class Summary extends PureComponent {
  constructor(props) {
    super(props);
    // this.shopLink = this.shopLink.bind(this);
  }
  // shopLink(event) {
  //   this.props.unsetFilter();
  //   this.props.unsetProductShow();
  // }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('%c SUMMARY SHOULD', 'color: yellow; font-size: 1rem', this.props.cartItems, nextProps.cartItems);
  //   return true;
  // }
  render() {
    // console.log('%c SUMMARY PROPS', 'color: yellow; font-size: 1rem', this.props);
    return React.createElement(SummaryComp, {
      cartItems: this.props.cartItems,
      products: this.props.products
    });
  }
}

// export component
export default Summary;
