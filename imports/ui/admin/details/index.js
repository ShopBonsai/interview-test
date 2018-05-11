// Framework
import React, { PureComponent } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import DetailsComp from "./comp.jsx";
import Brands from "../../../api/brands/collection";
import Categories from "../../../api/categories/collection";
import Customers from "../../../api/customers/collection";
import Merchants from "../../../api/merchants/collection";
import Orders from "../../../api/orders/collection";
import OrderStatus from "../../../api/orderStatus/collection";
import Products from "../../../api/products/collection";
import ProfileTypes from "../../../api/profileTypes/collection";

// define component
class Details extends PureComponent {
  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      activeTab: "brands"
    };
  }
  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    if (this.props.users.length < 1) return null;
    return React.createElement(DetailsComp, {
      brands: this.props.brands,
      categories: this.props.categories,
      customers: this.props.customers,
      merchants: this.props.merchants,
      orders: this.props.orders,
      orderStatus: this.props.orderStatus,
      products: this.props.products,
      profileTypes: this.props.profileTypes,
      users: this.props.users,
      toggleTab: this.toggleTab,
      activeTab: this.state.activeTab
    });
  }
}

// export component
export default withTracker(() => {
  Meteor.subscribe("brands");
  Meteor.subscribe("categories");
  Meteor.subscribe("customers");
  Meteor.subscribe("merchants");
  Meteor.subscribe("orders");
  Meteor.subscribe("orderStatus");
  Meteor.subscribe("products");
  Meteor.subscribe("profileTypes");
  Meteor.subscribe("users");
  return {
    // currentUser: Meteor.user(),
    brands: Brands.find().fetch(),
    categories: Categories.find().fetch(),
    customers: Customers.find().fetch(),
    merchants: Merchants.find().fetch(),
    orders: Orders.find().fetch(),
    orderStatus: OrderStatus.find().fetch(),
    products: Products.find().fetch(),
    profileTypes: ProfileTypes.find().fetch(),
    users: Meteor.users.find().fetch()
  };
})(Details);
