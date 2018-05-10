// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import CartComp from "./comp";
import Products from "../../api/products/collection";
import OrderStatus from "../../api/orderStatus/collection";
import ProfileTypes from "../../api/profileTypes/collection";
import Customers from "../../api/customers/collection";

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
    this.setState({ checkoutVisible: !this.state.checkoutVisible });
  }
  render() {
    // console.log(this.props);
    return React.createElement(CartComp, {
      products: this.props.products,
      customers: this.props.customers,
      profileTypes: this.props.profileTypes,
      orderStatus: this.props.orderStatus,
      checkoutVisible: this.state.checkoutVisible,
      toggleCheckout: this.toggleCheckout
    });
  }
}

// export component
export default withTracker(() => {
  Meteor.subscribe("products");
  Meteor.subscribe("profileTypes");
  Meteor.subscribe("orderStatus");
  Meteor.subscribe("customers");
  return {
    customers: Customers.find().fetch(),
    profileTypes: ProfileTypes.find().fetch(),
    orderStatus: OrderStatus.find().fetch(),
    products: Products.find().fetch()
  };
})(Cart);
