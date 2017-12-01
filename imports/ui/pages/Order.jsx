// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import Product from "../components/Product";
import PayNow from "../components/PayNow";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: {},
      error: null
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
    const cartID = this.props.match.params.orderID;
    Meteor.call("orders.getOrderById", cartID, (error, response) => {
      this.setState({
        ...this.state,
        cart: {
          id: cartID,
          products: response.products ? response.products : [],
          status: response.status ? response.status : "New"
        }
      });
    });
  }

  goBack = () => this.props.history.push("/shop");

  placeOrder = () => {
    Meteor.call("orders.placeOrder", this.state.cart, (error, response) => {
      if (response) {
        let cart = this.state.cart;
        cart.status = "Success";
        this.setState({
          ...this.state,
          cart: cart
        });

        window.localStorage.removeItem("cartID");
      } else {
        alert("Unable to Place Order. Please contact us at +1-234-5678910");
      }
    });
  };

  render() {
    const { cart, error } = this.state;

    return (
      <Page pageTitle="cart" history goBack={this.goBack}>
        <div className="shop">
          <div className="shop-filters">
            <PayNow
              onClick={this.placeOrder}
              goBack={this.goBack}
              cart={cart}
              className="btn-checkout"
            >
              Pay Now
            </PayNow>
          </div>
          <div className="shop-page">
            {cart.products && cart.products.length > 0
              ? cart.products.map(({ id, ...product }) =>
                  <Product
                    {...product}
                    id={id}
                    addtocart={this.addToCart}
                    key={id}
                    readOnly={true}
                  />
                )
              : ""}
          </div>
        </div>
      </Page>
    );
  }
}

export default Order;
