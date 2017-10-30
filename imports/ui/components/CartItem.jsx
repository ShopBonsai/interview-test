// Framework
import React from "react";
import { connect } from "react-redux";
// Actions
import * as actions from "../actions";

function CartItem(props) {
  const handleRemove = () => props.removeFromCart(props.product);

  return (
    <div className="cart-item" onClick={handleRemove}>
      {props.quantity} X {props.product.name}
    </div>
  );
}

export default connect(null, actions)(CartItem);
