// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import Page from "../components/Page.jsx";
import Product from "../components/Product";
import Loading from "../components/Loading";
import Search from "../components/Search";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      error: null,
      loading: false
    };
  }

  componentWillMount() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.setState(() => ({ loading: true }));
    Meteor.call("merchants.getMerchants", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        const getProductsFromMerchant = ({ products, brands }) =>
          products.map(({ belongsToBrand, ...product }) => ({
            ...product,
            brand: brands[belongsToBrand]
          }));

        let products = response.reduce(
          (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
          []
        );
        this.setState(() => ({ products }));
      }
      this.setState(() => ({ loading: false }));
    });
  }

  _onSearch(text) {
    if (!text) {
      this.getAllProducts();
    }

    Meteor.call("merchants.search", text, (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        const getProductsFromMerchant = ({ products, brands }) =>
          products.map(({ belongsToBrand, ...product }) => ({
            ...product,
            brand: brands[belongsToBrand]
          }));

        let products = response.reduce(
          (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
          []
        );
        this.setState(() => ({ products }));
      }
    });
  }

  goBack = () => this.props.history.push("/");

  render() {
    const { products, loading } = this.state;

    let content;
    if (loading) {
      content = <Loading />;
    } else {
      content = (
        <div className="shop-page">
          {products.map(({ id, ...product }) =>
            <Product {...product} key={id} />
          )};
        </div>
      );
    }

    return (
      <Page pageTitle="shop" history goBack={this.goBack}>
        {<Search onSearch={this._onSearch.bind(this)} />}
        {content}
      </Page>
    );
  }
}

export default Shop;
