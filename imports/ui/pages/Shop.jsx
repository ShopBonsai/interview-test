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
      error: null,
      loading: true,
      search: '',
    };
    this.onSearch = this.onSearch.bind(this)
  }

  componentWillMount() {
    this.setState(() => ({loading: true}))
    Meteor.call("merchants.getMerchants", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error, loading: false }));
      } else {
        this.setState(() => ({ merchants: response, loading: false }));
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
        { this.state.loading
          ? <Loader/>
          : <div className="shop-page">
              <Search onSearch={this.onSearch} search={this.state.search}/>
              {products.filter(product => {
                if (this.state.search === '') {
                  return true
                }
                return product.merchant.toLowerCase().match(this.state.search.toLocaleLowerCase())
                  || product.brand.toLowerCase().match(this.state.search.toLocaleLowerCase())
                  || product.name.toLowerCase().match(this.state.search.toLocaleLowerCase())
              })
              .map(({ id, ...product }) =>
                <Product {...product} key={id} />
              )}
            </div>
        }
      </Page>
    );
  }
}

export default Shop;
