// Framework
import React, { Component } from "react";

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import Product from "../components/Product";
import Cart from "./Cart.jsx";

// database
import { Orders } from "../../api/orders/collection";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchants: [],
      error: null,
      loading: true,
      order: [],
      cartQuantity: 0
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
  goCart = () => {
    try {
      Orders.insert(this.state.order), this.props.history.push("/cart");
    } catch (error) {
      throw new Meteor.Error("there was an error", error);
    }
  };

  onAddToCart(cartItem) {
    let { order } = this.state;
    order.push(cartItem);
    this.setState({ cartQuantity: this.state.order.length });
  }

  render() {
    const { loading } = this.state;
    const { merchants, error } = this.state;
    const { order } = this.state;
    const { cartQuantity } = this.state;

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
      <Page
        pageTitle="Shop"
        history
        goBack={this.goBack}
        goCart={this.goCart}
        cartNumber={cartQuantity}
      >
        <div className="shop-page">
          {products.map(({ id, ...product }) =>
            <Product
              {...product}
              key={id}
              history
              onAddToCart={this.onAddToCart.bind(this)}
            />
          )}
        </div>
      </Page>
    );
  }
}

export default Shop;
