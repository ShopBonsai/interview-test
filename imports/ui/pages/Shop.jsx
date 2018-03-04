// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import Icon from "react-icons-kit";
import { circleDown } from "react-icons-kit/icomoon/circleDown";
import {
  Pager,
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { filter, take, indexOf, concat, slice } from "lodash";

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
      shownMerchants: [],
      merchantsLastIndex: 10,
      shownProducts: [],
      cart: CartHelper.getCart(),
      error: null,
      search: {
        keyword: ""
      },
      merchantsSearch: {
        keyword: ""
      },
      page: 0
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
        this.applyFilterOnMerchants();
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
        search.keyword.trim() != ""
          ? filter(
              allProducts,
              product =>
                product.name
                  .toUpperCase()
                  .indexOf(search.keyword.toUpperCase()) != -1
            )
          : allProducts;
    this.setState({ shownProducts: products });
    if (!products.length) {
      search.helpBlock = "No Product found for this search";
      search.validationState = "error";
    } else if (search.keyword.trim() != "") {
      search.helpBlock = `${products.length} Products found for this search`;
      search.validationState = "success";
    } else {
      delete search.helpBlock;
      delete search.validationState;
    }
    this.setState({ search: search });
    this.goToPage(0);
  }

  applyFilterByMerchants() {
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
    const merchants = this.state.shownMerchants;
    merchant.class = merchant.class === "active" ? "" : "active";
    this.setState({ shownMerchants: merchants });
    this.applyFilterByMerchants();
  };

  applyFilterOnMerchants() {
    const search = this.state.merchantsSearch,
      merchants = this.state.merchants.filter(
        merchant =>
          merchant.merchant
            .toUpperCase()
            .indexOf(search.keyword.toUpperCase()) !== -1
      );
    if (!merchants.length) {
      search.validationState = "error";
    } else if (search.keyword.trim() != "") {
      search.validationState = "success";
    } else {
      delete search.validationState;
    }
    this.setState({
      merchantsSearch: search,
      merchantsLastIndex: 10,
      shownMerchants: merchants
    });
  }

  handleSearchChange = event => {
    const search = this.state.search;
    search.keyword = event.target.value;
    this.setState({ search: search });
    this.applyFilterByMerchants();
  };

  handleSearchForMerchantChange = event => {
    const search = this.state.merchantsSearch;
    search.keyword = event.target.value;
    this.setState({ merchantsSearch: search });
    this.applyFilterOnMerchants();
  };

  goToPage = index => {
    this.setState({ page: index });
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
            <div className="row">
              <h1 className="col-12 select-merchants">Select Merchants:</h1>
              <div className="col-12">
                <FormGroup
                  controlId="formBasicText"
                  validationState={this.state.merchantsSearch.validationState}
                >
                  <FormControl
                    type="text"
                    value={this.state.merchantsSearch.keyword}
                    placeholder="Filter merchants"
                    onChange={this.handleSearchForMerchantChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
              </div>
            </div>

            {take(
              this.state.shownMerchants,
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
                <div className="col-10">
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
              </div>
            )}
            <div className="show-more">
              {this.state.merchantsLastIndex < this.state.shownMerchants.length
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
                  placeholder="Filter Products"
                  onChange={this.handleSearchChange}
                />
                <FormControl.Feedback />
                <HelpBlock>
                  {this.state.search.helpBlock}
                </HelpBlock>
              </FormGroup>
            </form>
            <div className="row">
              {slice(
                this.state.shownProducts,
                this.state.page * 9,
                (this.state.page + 1) * 9
              ).map(product =>
                <div className="col-md-4 col-sm-6 col-xs-12" key={product.id}>
                  <Product product={product} addTocart={this.addTocart} />
                </div>
              )}
              <div className="col-12">
                <Pager>
                  <Pager.Item
                    previous
                    disabled={this.state.page == 0}
                    href="#"
                    onClick={() => this.goToPage(this.state.page - 1)}
                  >
                    Previous
                  </Pager.Item>
                  <Pager.Item
                    next
                    disabled={
                      (this.state.page + 1) * 9 >=
                      this.state.shownProducts.length
                    }
                    href="#"
                    onClick={() => this.goToPage(this.state.page + 1)}
                  >
                    Next
                  </Pager.Item>
                </Pager>;
              </div>
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default Shop;
