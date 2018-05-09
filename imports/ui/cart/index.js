// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import CartComp from "./comp";
import Products from "../../api/products/collection";

// define component
class Cart extends Component {
  componentDidMount() {
    document.title = "Shopping SmartCart at Bonsai";
  }
  render() {
    // console.log(this.props);
    return React.createElement(CartComp, {
      products: this.props.products
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
