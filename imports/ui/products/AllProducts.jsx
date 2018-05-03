// Framework
import React, { PureComponent } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import Product from "./Product";
import ProfileTypes from "../../api/profileTypes/collection";
import Categories from "../../api/categories/collection";
import Brands from "../../api/brands/collection";
import Merchants from "../../api/merchants/collection";
import Products from "../../api/products/collection";

// define component
class AllProducts extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const renderCards = array => {
      if (array.length < 1) {
        return console.log(array.length);
      }
      // console.log(array.length);
      return array.map(data => <Product key={data._id} data={data} allBrands={this.props.allBrands} />);
    };
    return (
      <section id="products-index">
        {renderCards(this.props.allProducts)}
      </section>
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
