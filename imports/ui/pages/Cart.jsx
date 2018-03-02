import React, { Component } from "react";

import { Icon } from "react-icons-kit";
import { Meteor } from "meteor/meteor";
import { find, isEqual, merge, remove } from "lodash";
import { Button, FormControl } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import { coinDollar } from "react-icons-kit/icomoon/coinDollar";

import { CartProduct } from "../components/CartProduct";
import { CartHelper } from "../helpers/CartHelper";
import Page from "../components/Page";
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      description: "",
      cartSubmitted: false
    };
  }

  componentWillMount() {
    this.state.cart = CartHelper.getCart();
    if (!this.state.cart.items.length) {
      this.goBack();
      return;
    }
    this.state.cart.items.map(item => {
      Meteor.call(
        "merchants.getProductById",
        item.product.id,
        (error, response) => {
          if (error) {
            console.error(error);
            this.setState(() => ({ error: error }));
          } else {
            item.product = response;
            const cart = this.state.cart;
            this.setState({ cart: cart });
          }
        }
      );
    });
  }

  handleChange = e => {
    this.setState({ description: e.target.value });
  };
  submitCart = e => {
    e.preventDefault();
    e.stopPropagation();
    const cart = CartHelper.getCart();
    cart.description = this.state.description;
    Meteor.call("carts.addNewCart", cart, (error, response) => {
      if (error) {
        NotificationManager.error("there was an error try again later");
      } else {
        NotificationManager.success(
          "Congratulation",
          "Your cart has been successfully sent"
        );
        CartHelper.clearCart();
        this.setState({
          cart: CartHelper.getCart(),
          cartSubmitted: true
        });
      }
    });
  };

  changeOccurrence = (productId, newOccurence) => {
    find(this.state.cart.items, item =>
      isEqual(item.product.id, productId)
    ).occurrence = newOccurence;
    this.state.cart = CartHelper.setupTotalPrice(this.state.cart);
    this.setState({ cart: this.state.cart });
    CartHelper.saveCart(this.state.cart);
  };

  removeProduct = productId => {
    remove(this.state.cart.items, item => isEqual(item.product.id, productId));
    this.state.cart = CartHelper.setupTotalPrice(this.state.cart);
    this.setState({ cart: this.state.cart });
    CartHelper.saveCart(this.state.cart);
    if (!this.state.cart.items.length){
      this.goBack();
    }
  };

  goBack = () => this.props.history.push("/shop");
  render() {
    return (
      <Page
        pageTitle="Cart"
        history={this.props.history}
        goBack={this.goBack}
        cart={this.state.cart}
      >
        <div className="container">
          {this.state.cartSubmitted
            ? <div className="done-shopping">
                <h1>
                  Congratulations, <a href="/shop">click here</a> to go back
                  shopping
                </h1>
              </div>
            : <fieldset>
                <legend>Current Cart</legend>
                {this.state.cart.items.map(item =>
                  <CartProduct
                    key={item.product.id}
                    product={item.product}
                    occurrence={item.occurrence}
                    removeProduct={this.removeProduct}
                    updateOccrrence={this.changeOccurrence}
                  />
                )}
                <div className="total-price-container">
                  <span>
                    {this.state.cart.totalPrice}{" "}
                    <Icon size={35} icon={coinDollar} className="price-icon" />
                  </span>
                </div>
                <form onSubmit={this.submitCart}>
                  <div className="row">
                    <div className="col-md-8">
                      <FormControl
                        value={this.state.description}
                        onChange={this.handleChange}
                        componentClass="textarea"
                        placeholder="Description"
                        required
                      />
                    </div>
                    <div className="col-md-4 ">
                      <Button
                        type="submit"
                        bsStyle="primary"
                        bsSize="large"
                        block
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </form>
              </fieldset>}
        </div>
      </Page>
    );
  }
}

export default Cart;
