import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Page from "../components/Page.jsx";
import CheckoutRow from "../components/CheckoutRow.jsx";
import * as types from "../store/types";
import Button from "../components/Button";

class Checkout extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch({ type: types.START_LOAD_CART });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.success) {
      alert("SHIPMENT IS ON THE WAY!");
      this.props.history.push("/shop");
    }
  }

  goBack = () => this.props.history.push("/shop");

  render() {
    return (
      <Page pageTitle="checkout" history goBack={this.goBack}>
        {this.props.cart.length > 0
          ? <div className="cart-container">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.cart.map(({ id, ...props }) =>
                    <CheckoutRow
                      key={id}
                      {...props}
                      totalPrice={props.quantity * props.price}
                    />
                  )}
                </tbody>
              </table>
              <Button
                className="cart-purchase-button"
                onClick={this.processCheckout}
              >
                Purchase
              </Button>
            </div>
          : <div className="cart-container">Your cart is empty!</div>}
      </Page>
    );
  }

  processCheckout = e => {
    e.preventDefault();
    e.stopPropagation();

    this.props.dispatch({ type: types.PROCESS_CHECKOUT });
  };
}

Checkout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  cart: state.orders.cart,
  success: state.orders.success
});

export default connect(mapStateToProps)(Checkout);
