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
      loading: true,
      data: null,
      order: []
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
    Meteor.call("merchants.alert", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        this.setState(() => ({ data: response }));
        console.log(response);
      }
    });
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 800); // simulates loading of data
  }

  goBack = () => this.props.history.push("/");
  goCart = () => this.props.history.push("/cart");

  onAddToCart(cartItem) {
    let { order } = this.state;

    order.push(cartItem);
    console.log(order)
  }

  render() {
    const { loading } = this.state;
    const { merchants, error } = this.state;
    const { data } = this.state;

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
        <Page
          pageTitle="Shop"
          history
          goBack={this.goBack}
          goCart={this.goCart}
        >
          <div className="loading-page">
            <i
              className="fa fa-spinner fa-spin fa-3x fa-fw"
              aria-hidden="true"
            />
            <br /> <br />
            <span>Loading...</span>
          </div>
        </Page>
      );
    }

    return (
      <Page pageTitle="Shop" history goBack={this.goBack} goCart={this.goCart}>
        <div className="shop-page">
          <h1>
            {data}
          </h1>
          {products.map(({ id, ...product }) =>
            <Product
              {...product}
              key={id}
              history
              data
              onAddToCart={this.onAddToCart.bind(this)}
            />
          )}
        </div>
      </Page>
    );
  }
}

export default Shop;
