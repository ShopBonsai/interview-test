// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import CartComp from "./comp";
import Products from "../../api/products/collection";

// define component
class Cart extends Component {
  constructor(props) {
    super(props);
    this.toggleCheckout = this.toggleCheckout.bind(this);
    this.state = {
      checkoutVisible: false
    };
  }
  componentDidMount() {
    document.title = "Shopping SmartCart at Bonsai";
  }
  toggleCheckout(event) {
    event.preventDefault();
    const { currentTarget } = event;
    console.log(this.props.cartItems);
    this.setState({ checkoutVisible: !this.state.checkoutVisible });
  }
  render() {
    // console.log(this.props);
    return React.createElement(CartComp, {
      products: this.props.products,
      checkoutVisible: this.state.checkoutVisible,
      toggleCheckout: this.toggleCheckout
    });
  }
}

// export component
export default withTracker(() => {
  Meteor.subscribe("products");
  return {
    products: Products.find().fetch()
  };
})(Cart);
