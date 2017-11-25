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

    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch({ type: types.START_LOAD_CART });
  }

  goBack = () => this.props.history.push("/shop");

  render() {
    return (
      <Page pageTitle="checkout" history goBack={this.goBack}>
        <div className="cart-container">
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
          <Button className="cart-purchase-button">Purchase</Button>
        </div>
      </Page>
    );
  }
}

Checkout.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
  cart: state.orders.cart
});

export default connect(mapStateToProps)(Checkout);
