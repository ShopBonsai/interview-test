// Framework
import React, { PureComponent } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
import ProfileTypes from "../../api/profileTypes/collection";
import Categories from "../../api/categories/collection";
import Brands from "../../api/brands/collection";
import Merchants from "../../api/merchants/collection";
import Products from "../../api/products/collection";
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Table,
  Button,
} from 'reactstrap';

// define component
class AllProducts extends PureComponent {
  render() {
    return (
      <p>{JSON.stringify(this.props.allProducts)}</p>
    );
  }
}

// export component
export default withTracker(() => {
  Meteor.subscribe("profileTypes");
  Meteor.subscribe("categories");
  Meteor.subscribe("brands");
  Meteor.subscribe("merchants");
  Meteor.subscribe("products");
  Meteor.subscribe("users");
  return {
    // currentUser: Meteor.user(),
    allProfileTypes: ProfileTypes.find().fetch(),
    allCategories: Categories.find().fetch(),
    allBrands: Brands.find().fetch(),
    allMerchants: Merchants.find().fetch(),
    allProducts: Products.find().fetch(),
    allUsers: Meteor.users.find().fetch()
  };
})(AllProducts);
