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

  componentWillMount() {
    this.props.dispatch({ type: types.FETCH_MERCHANTS });
  }

  render() {
    return (
      <Page pageTitle="shop" history goBack={this.goBack}>
        <div className="shop-page">
          {this.props.products.map(({ id, ...product }) =>
            <Product {...product} key={id} />
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
