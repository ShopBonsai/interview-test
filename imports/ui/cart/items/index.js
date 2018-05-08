// Framework
import React, { PureComponent } from "react";
import ItemsComp from "./comp";

// define component
class Items extends PureComponent {
  constructor(props) {
    super(props);
  }
  viewAll(event) {
    event.preventDefault();
    const { currentTarget } = event;
  }
  render() {
    return React.createElement(ItemsComp, {
      brands: this.props.brands,
      cartItems: this.props.cartItems,
      merchants: this.props.merchants,
      products: this.props.products,
      users: this.props.users
    });
  }
}

// export component
export default Items;
