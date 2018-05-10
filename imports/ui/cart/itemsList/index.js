// Framework
import React, { Component } from "react";
import ItemsListComp from "./comp";

// define component
class ItemsList extends Component {
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
    this.props.history.push("/cart");
  }
  deleteItem(event) {
    event.preventDefault();
    const { currentTarget } = event;
    // console.log(currentTarget.dataset.productid);
    this.props.deleteItem(currentTarget.dataset.productid);
  }
  render() {
    return React.createElement(ItemsListComp, {
      cartItems: this.props.cartItems,
      updateQuantity: this.updateQuantity,
      deleteItem: this.deleteItem
    });
  }
}

// export component
export default ItemsList;
