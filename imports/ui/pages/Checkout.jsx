import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Page from "../components/Page.jsx";
import * as types from "../store/types";

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch({ type: types.START_LOAD_CART });
  }

  render() {
    return (
      <Page pageTitle="checkout" history goBack={this.goBack}>
        <table className="cart-table">
          <thead>
            <tr>
              <th>
                Name
              </th>
              <th>
                Price
              </th>
              <th>
                Qty
              </th>
              <th>
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                A very expensive shirt
              </td>
              <td>
                $100.20
              </td>
              <td>
                2
              </td>
              <td>
                $200.40
              </td>
            </tr>
          </tbody>
        </table>
      </Page>
    );
  }
}

(Checkout).propTypes = {};

const mapStateToProps = (state, ownProps) => ({
  cart: state.orders.cart
});

export default connect(mapStateToProps)(Checkout);