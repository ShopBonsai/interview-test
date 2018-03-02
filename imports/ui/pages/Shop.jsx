// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import Product from "../components/Product";
import { CartHelper } from "../helpers/CartHelper";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchants: [],
      cart: CartHelper.getCart(),
      error: null
    };
  }

  componentWillMount() {
    Meteor.call("merchants.getMerchants", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        this.setState(() => ({ merchants: response }));
      }
    });
  }

  goBack = () => this.props.history.push("/");

  addTocart = product => {
    const cart = CartHelper.addProductToLocalCart(product, this.state.cart);
    this.setState(previousState => {
      previousState.cart = cart;
      return previousState;
    });
    CartHelper.saveCart(cart);
  };

  render() {
    const { merchants, error } = this.state;

    const getProductsFromMerchant = ({ products, brands }) =>
      products.map(({ belongsToBrand, ...product }) => ({
        ...product,
        brand: brands[belongsToBrand]
      }));

    const products = merchants.reduce(
      (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
      []
    );

    return (
      <Page
        pageTitle="shop"
        history={this.props.history}
        goBack={this.goBack}
        cart={this.state.cart}
      >
        <div className="row shop-page">
          <div className="col-md-4" />
          <div className="col-md-8">
            <div className="row">
              {products.map(product =>
                <div className="col-md-4 col-sm-6 col-xs-12" key={product.id}>
                  <Product product={product} addTocart={this.addTocart} />
                </div>
              )}
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default Shop;
