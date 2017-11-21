// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { connect } from "react-redux"

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import Cart from "../components/Cart.jsx"
import Product from "../components/Product";
import Spinner from 'react-spinner-material';


// State Selector
import { stateSelector as productState } from "../reducer/products"
import { stateSelector as cartState } from "../reducer/cart"

// Action
import { getProducts } from "../actions/productActions"
import { addToCart, removeFromCart } from "../actions/cartActions"
import { checkout } from "../actions/orderActions"

class Shop extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getProducts()
  }

  goBack = () => this.props.history.push("/");

  render() {
    const { products, cart, addToCart, removeFromCart, checkout } = this.props;
    return (
      <Page pageTitle="shop" history goBack={this.goBack}>
        {
          products.loading &&
          <div className="spinney">
            <Spinner
              size={120}
              spinnerColor={"#333"}
              spinnerWidth={2}
              visible={true} />
          </div>
        }
        {!products.loading &&
          <div>
            <div className="shop-page">
              {products.data.map(({ ...product }) =>
                <Product {...product} key={product.id} addToCart={addToCart} />
              )}
            </div>
            <Cart removeFromCart={removeFromCart} checkout={checkout} {...cart} />
          </div>
        }
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
  products: productState(state),
  cart: cartState(state)
})

export default connect(mapStateToProps, { getProducts, addToCart, removeFromCart, checkout })(Shop);
