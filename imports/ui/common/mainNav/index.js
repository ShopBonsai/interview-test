// Framework
import React, { PureComponent } from "react";
import MainNavComp from "./comp";

// define component
class MainNav extends PureComponent {
  constructor(props) {
    super(props);
  }
  viewAll(event) {
    event.preventDefault();
    const { currentTarget } = event;
  }
  render() {
    return React.createElement(MainNavComp, {
      cartItemsLength: this.props.cartItemsLength
    });
  }
}

// export component
export default MainNav;
