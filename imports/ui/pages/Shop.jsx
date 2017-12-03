// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

import {connect} from "react-redux"

//Redux
import {getUser} from "../redux/actions/user";
import {getProducts} from "../redux/actions/products";

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import Product from "../components/Product";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  componentDidMount() {
    // Get currnet USER and Products
    this.props.getUser();
    this.props.getProducts();
  }


  goBack = () => this.props.history.push("/");

  render() {
    const getProductsFromMerchant = ({ products, brands }) =>
      products.map(({ belongsToBrand, ...product }) => ({
        ...product,
        brand: brands[belongsToBrand]
      }));

    const products = this.props.merchants.reduce(
      (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
      []
    );

    return (
      <Page pageTitle="shop" history goBack={this.goBack}>
        <div className="shop-page">
          {products.map(({ id, ...product }) =>
            <Product {...{...product, id}} key={id} />
          )}
        </div>
      </Page>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: id => dispatch(getUser(id)),
    getProducts: () => dispatch(getProducts())
  }
}

const mapStateToProps = ({products, user}) => {
  console.log(products, user);
  return {
    merchants: products.merchants
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);

