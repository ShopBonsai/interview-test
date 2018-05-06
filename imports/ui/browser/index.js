// Framework
import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import ProductCard from "./ProductCard";
import Brands from "../../api/brands/collection";
import Products from "../../api/products/collection";
import ProfileTypes from "../../api/profileTypes/collection";
import Merchants from "../../api/merchants/collection";
import helpers from "../../helpers";
import Sorter from "../../sorter";

// define component
class Browser extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
  }
  render() {
    const filterProducts = products => {
      const { brands, profileTypes, merchants, filter, users } = this.props;
      // console.log(brands.length, products.length, profileTypes.length, users.length, filter);
      // console.log(users, profileTypes);
      let filtered = [];
      try {
        filtered = products
          .filter(product => product.published === true)
          .filter(product => {
            const target = filter.product.name.toLowerCase();
            const name = product.name.toLowerCase();
            // console.log('%c TEST', 'color: yellow; font-size: 1rem', target);
            // console.log('%c TEST', 'color: magenta; font-size: 1rem', name);
            if (target === "") {
              return product;
            }
            if (name.includes(target)) {
              return product;
            }
          })
          .filter(
            product =>
              filter.product.size === "any" ||
              product.size === filter.product.size
          )
          .filter(
            product =>
              filter.product.color === "any" ||
              product.color === filter.product.color
          )
          .filter(
            product =>
              (product.price >= filter.product.priceMin &&
                product.price <= filter.product.priceMax) ||
              (product.price >= filter.product.priceMin &&
                filter.product.priceMax === "") ||
              (filter.product.priceMin === "" &&
                product.price <= filter.product.priceMax) ||
              (filter.product.priceMin === "" && filter.product.priceMax === "")
          )
          .filter(
            product =>
              filter.brands.length === 0 ||
              filter.brands.includes(product.brand)
          )
          .filter(
            product =>
              filter.categories.length === 0 ||
              filter.categories.includes(product.category)
          )
          .filter(product => {
            const merchantId = helpers.findProductMerchantProfileId(
              product.user,
              users,
              merchants
            );
            // console.log('%c TEST', 'color: yellow; font-size: 1rem', merchantId);
            // console.log('%c TEST', 'color: magenta; font-size: 1rem', filter.merchants);
            if (filter.merchants.length === 0) return product;
            if (filter.merchants.includes(merchantId)) return product;
          });
      } catch (e) {
        console.error(e);
      } finally {
        return filtered;
      }
    };
    const sortProducts = (products, sort, brands) => {
      const sorter = new Sorter(products);
      let sorted = [];
      if (sort === "brand") {
        console.log(brands);
        sorted = sorter.byBrand(brands);
      } else if (sort === "lowHigh") {
        sorted = sorter.lowHigh();
      } else if (sort === "highLow") {
        sorted = sorter.bighLow();
      }
      sorted = sorter.byName();
      return sorted;
    };
    const renderProducts = currentSort => {
      // console.log(currentSort);
      let products = [];
      switch (currentSort) {
        case "lowHigh":
          products = this.props.lowHigh;
          break;
        case "highLow":
          products = this.props.highLow;
          break;
        case "brand":
          const sorter = new Sorter(this.props.byName);
          products = sorter.byBrand(this.props.brands);
          break;
        default:
          products = this.props.byName;
          break;
      }
      const filtered = filterProducts(products);
      if (filtered.length < 1) {
        return <h2 id="no-match-error">No Matching Products Found</h2>;
      }
      return filtered.map(product =>
        <ProductCard
          key={product._id}
          data={product}
          allBrands={this.props.brands}
        />
      );
    };
    return (
      <section id="browser">
        {renderProducts(this.props.currentSort)}
      </section>
    );
  }
}

// export component
export default withTracker(({ ...props }) => {
  Meteor.subscribe("brands");
  Meteor.subscribe("products");
  Meteor.subscribe("merchants");
  Meteor.subscribe("profileTypes");
  Meteor.subscribe("users");
  return {
    filter: props.filter,
    brands: Brands.find().fetch(),
    byName: Products.find({}, { sort: { name: 1 } }).fetch(),
    lowHigh: Products.find({}, { sort: { price: 1 } }).fetch(),
    highLow: Products.find({}, { sort: { price: -1 } }).fetch(),
    users: Meteor.users.find().fetch(),
    profileTypes: ProfileTypes.find().fetch(),
    merchants: Merchants.find().fetch()
  };
})(Browser);
