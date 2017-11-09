// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import Product from "../components/Product";

import Loader from "../components/Loader"
import Search from "../components/Search"

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchants: [],
      merchantList: [],
      brandList: [],
      error: null,
      loading: true,
      search: '',
      merchantFilter: '',
      brandFilter: '',
    };
    this.onSearch = this.onSearch.bind(this)
  }

  componentWillMount() {
    this.setState(() => ({loading: true}))
    Meteor.call("merchants.getMerchants", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error, loading: false }));
      } else {
        const merchantList = response.map(m => m.merchant).sort()
        const brands = response.map(m => m.brands)
          .reduce((acc, brands) => [...acc, ...brands], [])
        const brandList = [... new Set(brands)].sort();
        this.setState(() => ({ merchants: response, loading: false, merchantList, brandList }));
      }
    });
  }

  goBack = () => this.props.history.push("/");

  onSearch(search) {
    this.setState(() => ({loading: true, search}))
    if (search !== '') {
      Meteor.call("merchants.searchMerchants", { search }, (error, response) => {
        if (error) {
          this.setState(() => ({ error: error, loading: false }));
        } else {
          this.setState(() => ({ merchants: response, loading: false }));
        }
      });
    } else {
      this.componentWillMount()
    }
  }

  render() {
    const { merchants, error } = this.state;

    const getProductsFromMerchant = ({merchant, products, brands }) =>
      products.map(({ belongsToBrand, ...product }) => ({
        ...product,
        brand: brands[belongsToBrand],
        merchant
      }));

    const products = merchants.reduce(
      (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
      []
    );
    return (
      <Page pageTitle="shop" history goBack={this.goBack}>
        <div className="shop-page">
          <Search onSearch={this.onSearch} search={this.state.search}/>
          <div className="shop-filter">
            <select value={this.state.merchantFilter}
              onChange={(e) => {
                this.setState({merchantFilter: e.target.value})
              }}
            >
              <option value="">Select Merchant</option>
              { this.state.merchantList.map((merchant, index) => (
                <option key={index}>{merchant}</option>
              ))}
            </select>
            <select value={this.state.brandFilter}
              onChange={(e) => {
                this.setState({brandFilter: e.target.value})
              }}>
              <option value="">Select Brand</option>
              { this.state.brandList.map((brand, index) => (
                <option key={index}>{brand}</option>
              ))}
            </select>
          </div>
          { this.state.loading
            ? <Loader/>
            : products.filter(product => {
                if (this.state.search === '') {
                  return true
                }
                const search = this.state.search.toLocaleLowerCase()

                return product.merchant.toLowerCase().match(search)
                  || product.brand.toLowerCase().match(search)
                  || product.name.toLowerCase().match(search)
              }).filter(product => (
                this.state.merchantFilter === ''
                  || product.merchant.match(this.state.merchantFilter)
              )).filter(product => (
                this.state.brandFilter === ''
                  || product.brand.match(this.state.brandFilter)
              ))
              .map(({ id, ...product }) =>
                <Product {...product} key={id} />
              )
          }
          
        </div>
      </Page>
    );
  }
}

export default Shop;
