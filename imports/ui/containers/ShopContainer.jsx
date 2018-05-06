// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Route } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { updateOrder } from "../redux/OrdersRedux.js";

// Components
import Shop from "../pages/Shop.jsx";
import ThankYouContainer from "../containers/ThankYouContainer.jsx";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateOrder }, dispatch);

class ShopContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchants: [],
      products: [],
      error: null
    };
  }

  componentWillMount() {
    Meteor.call("merchants.getMerchants", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        this.setState(() => ({
          merchants: response,
          products: this.getProducts(response)
        }));
      }
    });
  }

  getProducts = merchants => {
    const getProductsFromMerchant = ({ products, brands, guid }) =>
      products.map(({ belongsToBrand, ...product }) => {
        product.merchantGuid = guid;
        return {
          ...product,
          brand: brands[belongsToBrand]
        };
      });

    const products = merchants.reduce(
      (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
      []
    );
    return products;
  };

  goBack = () => this.props.history.push("/");

  addOrder = product => {
    Meteor.call("orders.addOrder", product, (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        this.props.updateOrder({ ...response, ...product });
      }
    });
  };

  render() {
    return (
      <div>
        <Shop
          products={this.state.products}
          goBack={this.goBack}
          addOrder={this.addOrder}
        />
        <Route
          path={this.props.match.url + "/thank-you"}
          component={ThankYouContainer}
        />
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShopContainer);
