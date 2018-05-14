// Framework
import React, { PureComponent } from "react";
import MainNavComp from "./comp";

// define component
class MainNav extends PureComponent {
  constructor(props) {
    super(props);
    this.shopLink = this.shopLink.bind(this);
  }
  // componentDidUpdate(prevProps) {
  //   console.log("MAIN NAV", prevProps.cartItemsLength, this.props.cartItemsLength);
  // }
  shopLink(event) {
    this.props.unsetFilter();
    this.props.unsetProductShow();
  }
  render() {
    return React.createElement(MainNavComp, {
      cartItemsLength: this.props.cartItemsLength,
      shopLink: this.shopLink
    });
  }
}

// export component
export default MainNav;
