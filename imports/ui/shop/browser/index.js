// Framework
import React, { Component } from "react";
import BrowserComp from "./comp";
import helpers from "../../../helpers";
import Sorter from "../../../helpers/sorter";

// define component
class Browser extends Component {
  constructor(props) {
    super(props);
    this.viewProduct = this.viewProduct.bind(this);
    this.viewBrand = this.viewBrand.bind(this);
  }
  viewProduct(event) {
    event.preventDefault();
    const { currentTarget } = event;
    // console.log(currentTarget.dataset.productid);
    this.props.setProductShow(currentTarget.dataset.productid);
  }
  viewBrand(event) {
    event.preventDefault();
    const { currentTarget } = event;
    // console.log(currentTarget.dataset.brandid);
    const filter = {
      product: {
        color: "any",
        name: "",
        priceMax: "",
        priceMin: "",
        size: "any"
      },
      brands: [currentTarget.dataset.brandid],
      categories: [],
      merchants: []
    };
    // filter.brands.push(currentTarget.dataset.brandid);
    // console.log(filter);
    this.props.setFilter(filter);
  }
  render() {
    // dont render if no proucts default sort: name
    if (this.props.byName.length === 0) {
      return null;
    }

    // set local vars
    const {
      brands,
      byName,
      currentSort,
      filter,
      filterResults,
      highLow,
      lowHigh,
      merchants,
      users
    } = this.props;

    // get all products
    let products = byName;

    // replace products with sorted proeducts from database based on sort selection
    // console.log(currentSort);
    switch (currentSort) {
      case "lowHigh":
        products = lowHigh;
        break;
      case "highLow":
        products = highLow;
        break;
      case "brand":
        const withBrands = helpers.addBrandNames(byName, brands);
        const sorter = new Sorter(withBrands);
        products = sorter.alphabetical("brandName");
        break;
    }
    // console.log('%c PRODUCTS', 'color: yellow; font-size: 1rem', byName[0], products[0]);

    // set filtered results holder
    let filtered = [];

    // filter products based on selections
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
            filter.brands.length === 0 || filter.brands.includes(product.brand)
        )
        .filter(
          product =>
            filter.categories.length === 0 ||
            filter.categories.includes(product.category)
        )
        .filter(product => {
          let merchantProfile = "";
          try {
            merchantProfile = helpers.getMerchantProfile(
              product.user,
              users,
              merchants
            );
            // console.log('%c TEST', 'color: yellow; font-size: 1rem', merchantProfile);
          } catch (e) {
            console.error(e);
          }
          // console.log('%c TEST', 'color: yellow; font-size: 1rem', merchantProfile);
          // console.log('%c TEST', 'color: magenta; font-size: 1rem', filter.merchants);
          if (filter.merchants.length === 0) return product;
          if (filter.merchants.includes(merchantProfile._id)) return product;
        });
    } catch (e) {
      console.error("Filtering products failed", e);
    }
    // set sorted and new filtered products to state
    // console.log(this.props, filtered);
    if (this.props.byName.length > 0) {
      return React.createElement(BrowserComp, {
        filtered,
        brands: this.props.brands,
        viewProduct: this.viewProduct,
        viewBrand: this.viewBrand,
        setFiltered: this.props.setFiltered
      });
    }
  }
}

// export component
export default Browser;
