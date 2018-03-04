// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import Icon from "react-icons-kit";
import { circleDown } from "react-icons-kit/icomoon/circleDown";
import {
  FormControl,
  FormGroup,
  HelpBlock,
  ControlLabel
} from "react-bootstrap";
import { filter, take, indexOf, concat } from "lodash";

// Components
import Page from "../components/Page.jsx";
import Product from "../components/Product";
import { CartHelper } from "../helpers/CartHelper";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      merchants: [],
      merchantsLastIndex: 10,
      shownProducts: [],
      cart: CartHelper.getCart(),
      error: null,
      search: {
        keyword: ""
      }
    };
  }

  getProductsFromMerchant(merchant) {
    return merchant.products.map(({ belongsToBrand, ...product }) => ({
      ...product,
      brand: merchant.brands[belongsToBrand]
    }));
  }

  componentWillMount() {
    Meteor.call("merchants.getMerchants", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        const products = response.reduce(
            (acc, merchant) => [
              ...acc,
              ...this.getProductsFromMerchant(merchant)
            ],
            []
          ),
          merchants = response.map(merchant => {
            merchant.class = "";
            return merchant;
          });
        this.setState({ merchants: merchants });
        this.setState({ products: products });
        this.applyKeyWordFilter(products);
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

  showMore = () => {
    let lastIndex = this.state.merchantsLastIndex + 10;
    if (lastIndex >= this.state.merchants.length) {
      lastIndex = this.state.merchants.length;
    }
    this.setState({ merchantsLastIndex: lastIndex });
  };

  applyKeyWordFilter(allProducts) {
    const search = this.state.search,
      products =
        this.state.search.keyword.trim() != ""
          ? filter(allProducts, product => {
              return (
                product.name
                  .toUpperCase()
                  .indexOf(this.state.search.keyword.toUpperCase()) != -1
              );
            })
          : allProducts;
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

  applyMerchantsFilter() {
    const products = [];
    this.state.merchants.map(merchant => {
      if (merchant.class === "active") {
        products.push(...this.getProductsFromMerchant(merchant));
      }
    });
    products.length
      ? this.applyKeyWordFilter(products)
      : this.applyKeyWordFilter(this.state.products);
  }
  selectMerchant = merchant => {
    const merchants = this.state.merchants;
    merchant.class = merchant.class === "active" ? "" : "active";
    this.setState({ merchants: merchants });
    this.applyMerchantsFilter();
  };

  handleSearchChange = event => {
    const search = this.state.search;
    search.keyword = event.target.value;
    this.setState({ search: search });
    this.applyKeyWordFilter(this.state.products);
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
          <div className="col-md-4">
            <div className="row select-merchants">
              <h1>Select Merchants:</h1>
            </div>
            {take(
              this.state.merchants,
              this.state.merchantsLastIndex
            ).map(merchant =>
              <div
                onClick={() => this.selectMerchant(merchant)}
                className={"row merchant " + merchant.class}
                key={merchant._id}
              >
                <div className="col-2">
                  <img src={merchant.logo} />
                </div>
                <div className="col-8">
                  <p>
                    {merchant.merchant}
                  </p>
                  <span>
                    {merchant.address}
                  </span>
                  <br />
                  <span>
                    {merchant.phone}
                  </span>
                </div>
                <div className="col-2" />
              </div>
            )}
            <div className="show-more">
              {this.state.merchantsLastIndex < this.state.merchants.length
                ? <div>
                    <h2 onClick={this.showMore}>SHOW MORE</h2>
                    <Icon icon={circleDown} />
                  </div>
                : <h2>Nothing more to show</h2>}
            </div>
          </div>
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
