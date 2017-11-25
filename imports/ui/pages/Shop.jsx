// Framework
import React, { Component } from "react";

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import Product from "../components/Product";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchants: [],
      error: null,
      loading: true
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
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 800); // simulates loading of data
  }

  goBack = () => this.props.history.push("/");
  handleBuyProduct = () => this.props.history.push("/confirmation");

  render() {
    const { loading } = this.state;
    const { merchants, error } = this.state;

    const getProductsFromMerchant = ({ products, brands }) =>
      products.map(({ belongsToBrand, ...product }) => ({
        ...product,
        brand: brands[belongsToBrand]
      }));

    const products = merchants.reduce(
      (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
      []
    );

    if (loading) {
      return (
        <Page pageTitle="Shop" history goBack={this.goBack}>
        <div className="loading-page">
          <i className="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true" />
          <br /> <br />
          <span class="sr-only">Loading...</span>
        </div>
      </Page>
      );
    }

    return (
      <Page pageTitle="Shop" history goBack={this.goBack}>
        <div className="shop-page">
          {products.map(({ id, ...product }) =>
            <Product {...product} key={id} history />
          )}
        </div>
      </Page>
    );
  }
}

export default Shop;
