// Framework
import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import Page from "../components/Page.jsx";
import Product from "../components/Product";

class Shop extends Component {
  goBack = () => this.props.history.push("/");

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
