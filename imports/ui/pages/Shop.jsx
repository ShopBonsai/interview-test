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

  addOrder = ({ merchantGuid, productId }) => {
    Meteor.call(
      "orders.addOrder",
      { merchantGuid, productId },
      (error, response) => {
        if (error) {
          this.setState(() => ({ error: error }));
        } else {
          // I'd prefer to use Redux here, but for the sake of
          // simplicity I pass the state using history
          this.props.history.push({
            pathname: "/shop/thank-you",
            state: { orderId: response }
          });
        }
      }
    );
  };
  render() {
    const { merchants, error } = this.state;

    const getProductsFromMerchant = ({ products, brands, guid }) =>
      products.map(({ belongsToBrand, ...product }) => {
        product.merchantGuid = guid;
        return {
        ...product,
        brand: brands[belongsToBrand]
        };
      });

    const products = merchants.reduce(
      (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
      []
    );
    return (
      <Page pageTitle="shop" history goBack={this.goBack}>
        <div className="shop-page">
          {products.map(({ id, ...product }) =>
            <Product
              {...product}
              productId={id}
              key={id}
              handleBuyProduct={this.addOrder}
            />
          )}
        </div>
      </Page>
    );
  }
}

export default Shop;
