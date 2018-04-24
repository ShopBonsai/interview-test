// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import Product from "../components/Product";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchants: [],
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

  // productInfo is an object that looks like { id, image, name, price, quantity, selected }
  // that may or may not contain other keys that are disregarded by the method
  // where each key up to quantity maps directly to the props the product has received
  // and selected is the state representing the controlled component
  addToCart = ( productInfo ) => {
    Meteor.call("carts.addCartItem", productInfo, (error, response) => {
      if (error) {
        // need some testing to have better error handling
        // don't see the point of setting to state, really only
        // need a one time alert telling the user what went wrong
        // instead of changing the state of the application
        console.log(error);
        alert(error);
      } else {
        alert(productInfo.name + " was added to cart");
      }
    });
  }

  render() {
    const { merchants, error } = this.state;

    // takes each product sold by merchant and assiciates a brand
    // yields and array of that merchant's items
    const getProductsFromMerchant = ({ products, brands }) =>
      products.map(({ belongsToBrand, ...product }) => ({
        ...product,
        brand: brands[belongsToBrand]
      }));

    // takes everything in state and passes each merchant's data
    // into getProductsFromMerchant and spreads into 1 array
    const products = merchants.reduce(
      (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
      []
    );

    return (
      <Page pageTitle="Shop" history goBack={this.goBack}>
        <div className="shop-page">
          {products.map((props) =>
            <Product {...props} key={props.id} addToCart={this.addToCart} />
          )}
        </div>
      </Page>
    );
  }
}

export default Shop;
