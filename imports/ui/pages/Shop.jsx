// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import Page from "../components/Page.jsx";
import Product from "../components/Product.jsx";

class Shop extends Component {
  render() {
    return (
      <Page pageTitle="shop" history goBack={this.props.goBack}>
        <div className="shop-page">
          {this.props.products.map(({ id, ...product }) =>
            <Product
              {...product}
              productId={id}
              key={id}
              handleBuyProduct={this.props.addOrder}
            />
          )}
        </div>
      </Page>
    );
  }
}
export default Shop;
