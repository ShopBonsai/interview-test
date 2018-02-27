// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import Page from "../components/Page.jsx";
import Product from "../components/Product";
import Loading from "../components/Loading";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchants: [],
      error: null,
      loading: false
    };
  }

  componentWillMount() {
    this.setState(() => ({ loading: true }));
    Meteor.call("merchants.getMerchants", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        this.setState(() => ({ merchants: response }));
      }
      this.setState(() => ({ loading: false }));
    });
  }

  goBack = () => this.props.history.push("/");

  render() {
    const { merchants, loading } = this.state;

    let content;
    if (loading) {
      content = <Loading />;
    } else {
      const getProductsFromMerchant = ({ products, brands }) =>
        products.map(({ belongsToBrand, ...product }) => ({
          ...product,
          brand: brands[belongsToBrand]
        }));

      const products = merchants.reduce(
        (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
        []
      );

      content = (
        <div className="shop-page">
          {products.map(({ id, ...product }) =>
            <Product {...product} key={id} />
          )};
        </div>
      );
    }

    return (
      <Page pageTitle="shop" history goBack={this.goBack}>
        {content}
      </Page>
    );
  }
}

export default Shop;
