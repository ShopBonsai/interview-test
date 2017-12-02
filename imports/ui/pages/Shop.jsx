// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Form, FormGroup, Label, Input } from "reactstrap";
import Page from "../components/Page.jsx";
import Product from "../components/Product";

const ALL_SIZES_VALUE = "all";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchants: [],
      products: [],
      error: null
    };
  }
  
  _allProducts = [];

  componentWillMount() {
    Meteor.call("merchants.getMerchants", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        this._allProducts = response.reduce((acc, merchant) => [...acc, ...this.getProductsFromMerchant(merchant)], []);

        this.setState(() => ({
            merchants: response,
            products: [...this._allProducts]
          })
        );
      }
    });
  }

  goBack = () => this.props.history.push("/");

  getProductsFromMerchant = ({ products, brands }) =>
    products.map(({ belongsToBrand, ...product }) => ({
      ...product,
      brand: brands[belongsToBrand]
    }));

  render() {
    const { merchants, products, error } = this.state;

    return (
      <Page pageTitle="shop" history goBack={this.goBack}>
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
