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
      likes: [],
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
    
    Meteor.call("likes.getLikes", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        let likes = Object.assign(
          {},
          ...response.map(t => ({ [t.productId]: t }))
        );
        this.setState(() => ({ likes: likes }));
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
    const { merchants, likes, error, searchString } = this.state;

    const getProductsFromMerchant = ({ products, brands }) =>
      products.map(({ belongsToBrand, ...product }) => ({
        ...product,
        brand: brands[belongsToBrand],
        likes: likes[product.id] ? likes[product.id].count : 0
      }));

    const _allProducts = merchants.reduce(
      (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
      []
    );
    
    let products = _allProducts;

    let search = searchString.trim().toLowerCase();
    if (search.length > 0) {
      products = _allProducts.filter(function (product) {
        ;
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
            <Product {...product} key={id} id={id} />
          )}
        </div>
      </Page>
    );
  }
}

export default Shop;
