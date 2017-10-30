// Framework
import React from "react";
import { connect } from "react-redux";
// Actions
import * as actions from "../actions";
// Helpers
import { roundExactly } from "../helpers/num-helper";
// Components
import CartItem from "./CartItem";

function Cart(props) {
  const { cart, products } = props;

  return (
    <div className="cart">
      <div className="cart-header">Cart</div>
      <div className="cart-contents">
        {Object.keys(cart.items).map(itemId =>
          <CartItem
            key={itemId}
            product={products.allObj[itemId]}
            quantity={cart.items[itemId]}
          />
        )}
      </div>
      <div className="total">
        <div>
          Total: {roundExactly(cart.totalPrice, 2) || "0.00"}
        </div>
        <button className="checkout" onClick={props.checkout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

function mapStateToProps({ cart, products }) {
  return { cart, products };
}

export default connect(mapStateToProps, actions)(Cart);
