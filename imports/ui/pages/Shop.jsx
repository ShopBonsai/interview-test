// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import {
  FormControl,
  FormGroup,
  HelpBlock,
  ControlLabel
} from "react-bootstrap";
import { filter } from "lodash";

// Components
import Page from "../components/Page.jsx";
import Product from "../components/Product";
import { CartHelper } from "../helpers/CartHelper";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      shownProducts: [],
      cart: CartHelper.getCart(),
      error: null,
      search: {
        keyword: ""
      }
    };
  }

  componentWillMount() {
    Meteor.call("merchants.getMerchants", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        const getProductsFromMerchant = ({ products, brands }) =>
          products.map(({ belongsToBrand, ...product }) => ({
            ...product,
            brand: brands[belongsToBrand]
          }));
        const products = response.reduce(
          (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
          []
        );
        this.setState({ products: products });
        this.applyFilters();
      }
    });
  }

  goBack = () => this.props.history.push("/");

  addTocart = product => {
    const cart = CartHelper.addProductToLocalCart(product, this.state.cart);
    this.setState(previousState => {
      previousState.cart = cart;
      return previousState;
    });
    CartHelper.saveCart(cart);
  };

  applyFilters() {
    const search = this.state.search,
      products =
        this.state.search.keyword.trim() != ""
          ? filter(this.state.products, product => {
              return (
                product.name
                  .toUpperCase()
                  .indexOf(this.state.search.keyword.toUpperCase()) != -1
              );
            })
          : this.state.products;
    this.setState({ shownProducts: products });
    if (!products.length) {
      search.helpBlock = "No Product found for this search";
      search.validationState = "error";
    } else if (this.state.search.keyword.trim() != "") {
      search.helpBlock = `${products.length} Products found for this search`;
      search.validationState = "success";
    } else {
      delete search.helpBlock;
      delete search.validationState;
    }
    this.setState({ search: search });
  }

  handleSearchChange = event => {
    const search = this.state.search;
    search.keyword = event.target.value;
    this.setState({ search: search });
    this.applyFilters();
  };
  render() {
    return (
      <Page
        pageTitle="shop"
        history={this.props.history}
        goBack={this.goBack}
        cart={this.state.cart}
      >
        <div className="row shop-page">
          <div className="col-md-4" />
          <div className="col-md-8">
            <form className="row filter-key">
              <FormGroup
                controlId="formBasicText"
                validationState={this.state.search.validationState}
              >
                <ControlLabel>Find Products by Key</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.search.keyword}
                  placeholder="Enter text"
                  onChange={this.handleSearchChange}
                />
                <FormControl.Feedback />
                <HelpBlock>
                  {this.state.search.helpBlock}
                </HelpBlock>
              </FormGroup>
            </form>
            <div className="row">
              {this.state.shownProducts.map(product =>
                <div className="col-md-4 col-sm-6 col-xs-12" key={product.id}>
                  <Product product={product} addTocart={this.addTocart} />
                </div>
              )}
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default Shop;
