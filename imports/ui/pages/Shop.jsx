// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import ShoppingBag from "../components/ShoppingBag.jsx"
import Product from "../components/Product";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchants: [],
      error: null,
      cartItemCount: 0,
      cartError: null
    };
  }

  componentWillMount() {
    this.getMerchantsData();
    this.getCartData();
  }

  getMerchantsData() {
    Meteor.call("merchants.getMerchants", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        this.setState(() => ({ merchants: response }));
      }
    });
  }

  getCartData() {
    if (document.cookie != "") {
      let cartId = document.cookie.split("=")[1];
      Meteor.call("carts.getCartById", cartId, (error, response) => {
        if (error) {
          this.setState(() => ({ cartError: error }));
        } else {
          let products = response.products;
          let cartItemCount = Object.keys(products).length;
          this.setState({cartItemCount: cartItemCount});
        }
      });
    }
  }

  goBack = () => this.props.history.push("/");

  increaseCartItemCount = () => {
    let cartItemCount = this.state.cartItemCount + 1;
    this.setState({cartItemCount: cartItemCount});
  }

  render() {
    const { merchants, error, cartItemCount } = this.state;

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
      <Page pageTitle="shop" history goBack={this.goBack}>
        <ShoppingBag itemCount={ cartItemCount} history={this.props.history} />
        <div className="shop-page">
          {products.map(({ id, ...product }) =>
            <Product {...product} id={id} increaseCount={this.increaseCartItemCount} key={id} />
          )}
        </div>
      </Page>
    );
  }
}

export default Shop;
