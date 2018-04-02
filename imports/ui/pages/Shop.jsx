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
      visibleMerchants: [],
      error: null,
      loaded: false,
      visitors: 0,
      collapse: false 
    };
    this._handleSearchChange.bind(this);
    this.filterMerchants.bind(this);
  }

  componentWillMount() {
    Meteor.call("merchants.getMerchants", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        this.setState(() => ({ loaded: true, merchants: response, visibleMerchants: response }));
      }
    });
    Meteor.call("pageLoads.increaseCountLoad", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        this.setState(() => ({ visitors: response }));
      }
    });
  }

  goBack = () => this.props.history.push("/");

  _handleSearchChangeBrand = (term) => {
    this.setState({ search: term, errors: null, }, this.filterMerchants)
  }
  _handleSearchChangeProd = (term) => {
    this.setState({ search: term, errors: null, }, this.filterMerchants)
  }
  _handleSearchChange = (term) => {
    this.setState({ search: term, errors: null, }, this.filterMerchants)
  }

  filterMerchants = () => {
    const { merchants, search } = this.state;
    let visibleMerchants = merchants;
    if (search) {
      visibleMerchants = visibleMerchants.filter(
        (merchantObj) => {
          return merchantObj.merchant.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
      )
    }
    this.setState({
      visibleMerchants: visibleMerchants
    })
  }

  render() {
    const { visibleMerchants, error } = this.state;

    const getProductsFromMerchant = ({ products, brands, _id, merchant }) => 
      products.map(({ belongsToBrand, ...product }) => ({
        ...product,
        brand: brands[belongsToBrand],
        id_merch: _id,
        merchant: merchant
      }));
      
    const products = visibleMerchants.reduce(
      (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
      []
    );

    return (
      <Page pageTitle="shop" history goBack={this.goBack} visitors={this.state.visitors} >
        <div className="shop-page">
          <Loader scale={2.00} loaded={this.state.loaded}>
            <div className="filters">
              <div className="search">
                <label>Brand</label>
                <input
                  type="text"
                  value={this.state.search}
                  onChange={event => { this._handleSearchChangeBrand(event.target.value) }}
                  placeholder="Search Brand.." />
              </div>
              <div className="search">
                <label>Product</label>
                <input
                  type="text"
                  value={this.state.search}
                  onChange={event => { this._handleSearchChangeProd(event.target.value) }}
                  placeholder="Search Product.." />
              </div>
              <div className="search">
                <label>Merchant</label>
                <input
                  type="text"
                  value={this.state.search}
                  onChange={event => { this._handleSearchChange(event.target.value) }}
                  placeholder="Search Merchant.." />
              </div>
            </div>
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
