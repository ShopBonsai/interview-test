// Framework
import React, { PureComponent } from "react";
import FilterComp from "./comp";
import helpers from "../../../helpers";

// define component
class Filter extends PureComponent {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
    // console.log('%c PROPS', 'color: yellow; font-size: 1rem', props);
  }
  shouldComponentUpdate(nextProps) {
    // console.log('%c Should Component Update', 'color: yellow; font-size: 1rem', this.props, nextProps);
    if (
      this.props.filterResults.length !== nextProps.filterResults.length ||
      this.props.productsCount !== nextProps.productsCount
    ) {
      return true;
    }
    return false;
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
    return React.createElement(FilterComp, {
      submitHandler: this.submitHandler,
      resetHandler: this.resetHandler,
      filterValues: this.props.filterValues,
      filterResults: this.props.filterResults,
      productsCount: this.props.productsCount
    });
  }
}

// export component
export default Filter;
