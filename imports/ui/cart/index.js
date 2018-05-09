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
    this.toggleOrderScreen = this.toggleOrderScreen.bind(this);
    this.state = {
      orderScreen: false
    };
  }
  componentDidMount() {
    document.title = "Shopping SmartCart at Bonsai";
  }
  toggleOrderScreen(event) {
    event.preventDefault();
    const { currentTarget } = event;
    console.log(this.props.cartItems);
    this.setState({ orderScreen: !this.state.orderScreen });
  }
  render() {
    // console.log(this.props);
    return React.createElement(CartComp, {
      products: this.props.products,
      orderScreen: this.state.orderScreen,
      toggleOrderScreen: this.toggleOrderScreen
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
