// Framework
import React, { PureComponent } from "react";
import FilterComp from "./comp";
import defaultState from "../../redux/defaultState.json";

// define component
class Filter extends PureComponent {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
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
      filteredBrands: this.props.filteredBrands,
      filteredCategories: this.props.filteredCategories,
      filteredMerchants: this.props.filteredMerchants
    });
  }
}

// export component
export default Filter;
