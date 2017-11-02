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
      error: null,
      visits: 0
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

    Meteor.call("visits.logVisit", "Shop", (error, response) => {
      if (error) {
        // console.log(error);
      } else {
        // console.log(response);
      }
    });

    Meteor.call("visits.getPageCount", "Shop", (error, response) => {
      if (error) {
        // console.log(error);
      } else {
        // console.log(response);
      }
    });
  }

  goBack = () => this.props.history.push("/");

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
      <Page pageTitle="shop" history goBack={this.goBack}>
        {products.length < 1 &&
          <div className="spinner-box">
            <div className="spinner" />
          </div>}

        <div className="shop-page">
          {products.map(({ id, ...product }) =>
            <Product {...product} key={id} />
          )}
        </div>
      </Page>
    );
  }
}

export default Shop;
