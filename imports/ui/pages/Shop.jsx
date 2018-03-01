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
      loading: false,
      keyword: this.props.match.params.keyword,
      minPrice: parseInt(this.props.match.params.minPrice),
      maxPrice: parseInt(this.props.match.params.maxPrice)
    };
  }

  componentWillMount() {
    this.search();
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

  search() {
    if (
      !this.state.keyword ||
      this.state.minPrice === undefined ||
      this.state.minPrice === undefined
    ) {
      this.getAllProducts();
    }

    Meteor.call(
      "merchants.search",
      this.state.keyword,
      this.state.minPrice,
      this.state.maxPrice,
      (error, response) => {
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
      }
    );
  }

  _onSearch(text) {
    this.setState(
      () => ({ keyword: text }),
      () => {
        this.search();
      }
    );
  }

  _onFilter() {
    this.props.history.push(
      `/search/filter/${this.state.keyword}/${this.state.minPrice}/${this.state
        .maxPrice}`
    );
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

    let pageTitle = this.state.keyword
      ? "searching for " + this.state.keyword
      : "shop";
    return (
      <Page pageTitle={pageTitle} history goBack={this.goBack}>
        {
          <Search
            onSearch={this._onSearch.bind(this)}
            onFilter={this._onFilter.bind(this)}
          />
        }
        {content}
      </Page>
    );
  }
}

export default Shop;
