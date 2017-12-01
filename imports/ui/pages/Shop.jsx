// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import Product from "../components/Product";
import Checkout from "../components/Checkout";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchants: [],
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
    if (window.localStorage && window.localStorage.getItem("cartID")) {
      const cartID = window.localStorage.getItem("cartID");
      Meteor.call("orders.getOrderById", cartID, (error, response) => {
        this.setState({
          ...this.state,
          cart: {
            id: window.localStorage.getItem("cartID"),
            products: response.products ? response.products : []
          }
        });
      });
    }
  }

  addToCart = props => {
    const cart = this.state.cart;
    const addProduct = (cart, myProduct) => {
      let product = {
        ...myProduct
      };
      const productAlreadyInCart = cart.products.findIndex(
        p => p.id === product.id && p.merchant === product.merchant
      );
      if (productAlreadyInCart > -1) {
        cart.products[productAlreadyInCart].quantity =
          cart.products[productAlreadyInCart].quantity + 1;
      } else {
        product.quantity = 1;
        cart.products.push(product);
      }
      this.setState({
        ...this.state,
        cart: cart
      });

      Meteor.call("orders.updateOrder", cart, (error, response) => {
        if (error) {
          alert("Unable to Update Order in Database " + error);
        }
      });
    };

    if (!cart.id) {
      Meteor.call("orders.createNewOrder", (error, response) => {
        if (error) {
          alert("Unable to Add Product to Cart " + error);
        } else {
          window.localStorage.setItem("cartID", response);
          cart.id = response;
          cart.products = [];
          addProduct(cart, props);
        }
      });
    } else {
      addProduct(cart, props);
    }
  };

  goBack = () => this.props.history.push("/");

  goOrderPage = () => this.props.history.push("/order/" + this.state.cart.id);

  render() {
    const { merchants, error } = this.state;

    const getProductsFromMerchant = ({ products, brands, ...merchant }) =>
      products.map(({ belongsToBrand, ...product }) => ({
        ...product,
        brand: brands[belongsToBrand],
        merchant: merchant._id
      }));

    const products = merchants.reduce(
      (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
      []
    );

    return (
      <Page pageTitle="shop" history goBack={this.goBack}>
        <div className="shop">
          <div className="shop-filters">
            <Checkout
              onClick={this.goOrderPage}
              cart={this.state.cart}
              className="btn-checkout"
            >
              Proceed to Checkout
            </Checkout>
          </div>
          <div className="shop-page">
            {products.map(({ id, ...product }) =>
              <Product
                {...product}
                id={id}
                addtocart={this.addToCart}
                key={id}
                readOnly={false}
              />
            )}
          </div>
        </div>
      </Page>
    );
  }
}

export default Shop;
