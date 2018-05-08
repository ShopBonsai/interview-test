// Framework
import React, { PureComponent } from "react";
import ItemsComp from "./comp";

// define component
class Items extends PureComponent {
  constructor(props) {
    super(props);
    this.updateQuantity = this.updateQuantity.bind(this);
  }
  updateQuantity(event) {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);
    const item = {
      product: currentTarget.dataset.productid,
      quantity: formData.get("quantity")
    };
    // console.log(item);
    this.props.updateCartItem(item);
  }
  render() {
    return React.createElement(ItemsComp, {
      brands: this.props.brands,
      cartItems: this.props.cartItems,
      merchants: this.props.merchants,
      products: this.props.products,
      users: this.props.users,
      updateQuantity: this.updateQuantity
    });
  }
}

// export component
export default Items;
