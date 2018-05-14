// Framework
import React, { PureComponent } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import FilterComp from "./comp";
import helpers from "../../../helpers";
import Merchants from "../../../api/merchants/collection";
import Products from "../../../api/products/collection";

// define component
class Filter extends PureComponent {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
    this.state = {
      filterValues: {
        brands: [],
        categories: [],
        merchants: []
      }
    };
    // console.log('%c PROPS', 'color: yellow; font-size: 1rem', props);
  }
  shouldComponentUpdate(nextProps) {
    if (
      this.props.filterResults !== nextProps.filterResults ||
      this.props.users.length !== nextProps.users.length ||
      this.props.merchants.length !== nextProps.merchants.length ||
      this.props.productsCount !== nextProps.productsCount
    ) {
      // console.log('%c COMPONENT SHOULD UPDATE', 'color: yellow; font-size: 1rem', this.props, nextProps);
      return true;
    }
    return false;
  }
  componentWillReceiveProps(nextProps) {
    // console.log('%c COMPONENT DID UPDATE', 'color: yellow; font-size: 1rem', prevProps, this.props);
    if (nextProps.users.length > 0 && nextProps.merchants.length > 0) {
      // console.log('%c TEST', 'color: yellow; font-size: 1rem', nextProps.users.length, nextProps.merchants.length);
      const filterValues = helpers.getFilterResultsValues(
        nextProps.filterResults,
        nextProps.merchants,
        nextProps.users
      );
      // console.log(filterValues);
      this.setState({ filterValues });
    }
  }
  submitHandler(event) {
    event.preventDefault();
    const { currentTarget, target } = event;
    const formData = new FormData(currentTarget);
    const values = {
      product: {}
    };
    values.product.name = formData.get("name");
    values.product.size = formData.get("size");
    values.product.color = formData.get("color");
    values.product.priceMin = formData.get("priceMin");
    values.product.priceMax = formData.get("priceMax");
    values.brands = formData.getAll("brands");
    values.categories = formData.getAll("categories");
    values.merchants = formData.getAll("merchants");
    // console.log(setFilter);
    this.props.setFilter(values);
  }
  resetHandler(event) {
    const { currentTarget, target } = event;
    // console.log(currentTarget);
    this.props.unsetFilter();
    // this.props.setFilter(defaultState.ui.filter);
  }
  render() {
    // console.log('%c RENDER', 'color: yellow; font-size: 1rem', this.state);
    return React.createElement(FilterComp, {
      submitHandler: this.submitHandler,
      resetHandler: this.resetHandler,
      filterValues: this.state.filterValues,
      filterResults: this.props.filterResults,
      productsCount: this.props.products.length
    });
  }
}

// export component
export default withTracker(() => {
  Meteor.subscribe("merchants");
  Meteor.subscribe("products");
  Meteor.subscribe("users");
  return {
    users: Meteor.users.find().fetch(),
    merchants: Merchants.find().fetch(),
    products: Products.find().fetch()
  };
})(Filter);
