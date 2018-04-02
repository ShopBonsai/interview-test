// Framework
import React, { Component } from "react";

class CartRow extends Component {
  render() {
    const orderItem = this.props.item;

    const Row = () => {
      if (orderItem) {
        const name = orderItem.item.name;
        const quantity = orderItem.quantity;
        const price = orderItem.item.price;

        return (
          <tr>
            <td>{name}</td>
            <td className="quantity">{quantity}</td>
            <td className="price">$&nbsp;{price.toFixed(2)}</td>
          </tr>
        );
      } else {
        return null;
      }
    }

    return (
      <Row />
    );
  }
}

export default CartRow;