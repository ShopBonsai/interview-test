// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import Product from "../components/Product.jsx";
import { withHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Orders } from "../../api/orders/collection.js";


class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchants: [],
      error: null,
      search: ''
    };
  }
  // live search function
  updateSearch(event){
    this.setState({search: event.target.value});
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
    const filteredProducts = products.filter(
      (product) => {
        return (
          product.brand.toLowerCase().indexOf(this.state.search) !== -1 ||
          product.name.toLowerCase().indexOf(this.state.search) !== -1
        )
      }
    );


    return (
      <Page pageTitle="shop" history goBack={this.goBack}>
      <ul>
          Search: <input id="search" type="text"
          value={this.state.search}
          onChange={this.updateSearch.bind(this)}/>

      </ul>
        <div className="shop-page">
          {filteredProducts.map(({ id, ...product }) => {
            return <Product {...product} key={id} />
          }
          )}
        </div>
      </Page>
    );
  }
}

export default Shop;
