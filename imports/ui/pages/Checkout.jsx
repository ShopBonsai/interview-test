import React, {Component} from 'react';
import {connect} from 'react-redux';
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
        <table>
          <thead>
            <th>
              <td>

              </td>
            </th>
          </thead>
          {this.props.cart.map(({ id, ...product }) =>

          )}
        </table>
      </Page>
    );
  }
}

(Checkout).propTypes = {};

const mapStateToProps = (state, ownProps) => {
  state.orders.cart.reduce((ord, acc) => {
    acc[ord.id] ? acc[ord.id].push(ord) : acc[ord.id] = [ord];
  }, {})
};

export default connect(mapStateToProps)(Checkout);