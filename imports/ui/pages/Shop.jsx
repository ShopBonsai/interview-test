// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import Product from "../components/Product";
import Loader from 'react-loader';

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchants: [],
      error: null,
      loaded: false,
      visitors: 0
    };
  }

  componentWillMount() {
    Meteor.call("merchants.getMerchants", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        this.setState(() => ({ loaded: true, merchants: response }));
      }
    });
    Meteor.call("pageLoads.increaseCountLoad", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        this.setState(() => ({ visitors: response }));
        console.log(response)
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
      <Page pageTitle="shop" history goBack={this.goBack} visitors={this.state.visitors} >
        <div className="shop-page">
          <Loader scale={2.00} loaded={this.state.loaded}>
          {products.map(({ id, ...product }) =>
            <Product {...product} key={id} />
          )}
          </Loader>
        </div>
      </Page>
    );
  }
}

export default Shop;
