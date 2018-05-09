// Framework
import React, { PureComponent } from "react";
import ItemsComp from "./comp";

// define component
class Items extends PureComponent {
  constructor(props) {
    super(props);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
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
  deleteItem(event) {
    event.preventDefault();
    const { currentTarget } = event;
    // console.log(currentTarget.dataset.productid);
    this.props.deleteItem(currentTarget.dataset.productid);
  }
  render() {
    return React.createElement(ItemsComp, {
      brands: this.props.brands,
      cartItems: this.props.cartItems,
      merchants: this.props.merchants,
      products: this.props.products,
      users: this.props.users,
      updateQuantity: this.updateQuantity,
      deleteItem: this.deleteItem
    });
  }
}

// export component
export default Items;
