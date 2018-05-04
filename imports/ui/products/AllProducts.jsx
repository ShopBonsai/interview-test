// Framework
import React, { PureComponent } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import ProductCard from "./ProductCard";
import Brands from "../../api/brands/collection";
import Products from "../../api/products/collection";

// define component
class AllProducts extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const renderCards = array => {
      if (array.length < 1) {
        return null;
      }
      // console.log(array.length);
      return array.map(data => <ProductCard key={data._id} data={data} allBrands={this.props.allBrands} />);
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
  Meteor.subscribe("brands");
  Meteor.subscribe("products");
  return {
    // currentUser: Meteor.user(),
    allBrands: Brands.find().fetch(),
    allProducts: Products.find().fetch()
  };
})(AllProducts);
