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
      products: [],
      visibleProducts: [],
      error: null,
      loaded: false,
      visitors: 0,
      collapse: false ,
      search: '',
      searchBrand: '',
      searchProd: '',
    };
    this._handleSearchChange.bind(this);
    this._handleSearchChangeProd.bind(this);
    this.filterMerchants.bind(this);
    this.filterProd.bind(this);
  }

  componentWillMount() {
    Meteor.call("merchants.getMerchants", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        const products = response.reduce(
          (acc, merchant) => [...acc, ...this.getProductsFromMerchant(merchant)],
          []
        );
        this.setState(() => ({ 
          loaded: true, 
          merchants: response, 
          visibleMerchants: response, 
          visibleProducts: products, 
          products: products
         }));
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

  getProductsFromMerchant = ({ products, brands, _id, merchant }) =>
    products.map(({ belongsToBrand, ...product }) => ({
      ...product,
      brand: brands[belongsToBrand],
      id_merch: _id,
      merchant: merchant
    }));

  goBack = () => this.props.history.push("/");

  _handleSearchChange = (term) => {
    this.setState({ search: term, errors: null, }, this.filterMerchants)
  }

  _handleSearchChangeProd = (term) => {
    this.setState({ searchProd: term, errors: null, }, this.filterProd)
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

  filterProd = () => {
    const { products, searchProd } = this.state;
    let visibleProducts = products
    if (searchProd) {
      visibleProducts = visibleProducts.filter(
        (produt) => {
          return produt.name.toLowerCase().indexOf(this.state.searchProd.toLowerCase()) !== -1;
        }
      )
    }
    this.setState({
      visibleProducts: visibleProducts
    })
  }

  render() {
    const { visibleMerchants, visibleProducts } = this.state;
      
    const products = visibleProducts.filter((product) => {
      return visibleMerchants.some((merchantObj) =>{
        return product.merchant === merchantObj.merchant;
      })
    })

    return (
      <Page pageTitle="shop" history goBack={this.goBack} visitors={this.state.visitors} >
        <div className="shop-page">
          <Loader scale={2.00} loaded={this.state.loaded}>
            <div className="filters">
              <div className="search">
                <label>Product</label>
                <input
                  type="text"
                  value={this.state.searchProd}
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
