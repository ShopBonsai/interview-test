// Framework
import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import Page from "../components/Page.jsx";
import Product from "../components/Product";

import * as types from "../store/types.js";

class Shop extends Component {
  constructor(props) {
    super(props);
  }

  goBack = () => this.props.history.push("/");

  componentDidMount() {
    this.props.dispatch({ type: types.FETCH_MERCHANTS });
    this.props.dispatch({ type: types.START_LOAD_CART });
  }

  render() {
    return (
      <Page pageTitle="shop" history goBack={this.goBack}>
        <div className="shop-page">
          {this.props.products.map(({ id, ...product }) =>
            <Product
              {...product}
              key={id}
              addToCart={quantity =>
                this.props.dispatch({
                  type: types.SAVE_TO_CART,
                  productId: id,
                  quantity,
                  totalPrice: quantity * product.price
                })}
            />
          )}
        </div>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  products: state.merchants.products,
  error: state.merchants.error
});

export default connect(mapStateToProps)(Shop);
