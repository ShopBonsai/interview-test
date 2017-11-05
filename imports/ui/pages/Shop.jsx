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
      searchString: ""
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

  handleSearch = () => {
    this.setState({
      searchString: this.refs.search.value
    });
  }

  render() {
    const { merchants, error } = this.state;

    const getProductsFromMerchant = ({ products, brands }) =>
      products.map(({ belongsToBrand, ...product }) => ({
        ...product,
        brand: brands[belongsToBrand]
      }));

    const _allProducts = merchants.reduce(
      (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
      []
    );

    products = _allProducts;

    let search = this.state.searchString.trim().toLowerCase();
    if (search.length > 0) {
      products = _allProducts.filter(function (product) {
        return product.name.toLowerCase().match(search);
      });
    }

    return (
      <Page pageTitle="shop" history goBack={this.goBack}>
        <div className="search">
          <input
            type="text"
            value={this.searchString}
            ref="search"
            onChange={this.handleSearch}
            placeholder="Search for name"
          />
        </div>
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
