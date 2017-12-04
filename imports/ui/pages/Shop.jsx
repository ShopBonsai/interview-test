// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

import { connect } from "react-redux"

//Redux
import { getUser } from "../redux/actions/user";
import { getMerchants } from "../redux/actions/merchants";

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
    this.props.getMerchants();
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
            <Product {...{ ...product, id }} key={id} />
          )}
        </div>
      </Page>
    );
  }
}

const mapDispatchToProps = dispatch => {
  // Map action to to dispatch it from the component
  return {
    getUser: id => dispatch(getUser(id)),
    getMerchants: () => dispatch(getMerchants())
  };
};

const mapStateToProps = ({ merchants, user }) => {
  // Map data to match liked products
  const mappedMerchants = merchants.map(({ ...merch, products }) => ({
    ...merch,
    products: products.map(prod => ({
      ...prod,
      liked: user.favorites.indexOf(prod.id) >= 0
    }))
  }));

  return {
    merchants: mappedMerchants
  };
};

// Connect action and state to the Component
export default connect(mapStateToProps, mapDispatchToProps)(Shop);
