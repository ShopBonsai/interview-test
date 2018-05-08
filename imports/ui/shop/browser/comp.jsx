// import modules
import React, { Component } from "react";
import ProductCard from "./productCard";

// define component
class BrowserComp extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
  }
  componentDidMount() {
    this.props.setFiltered(this.props.filtered);
  }
  shouldComponentUpdate(nextProps) {
    if (
      this.props.filtered.length !== nextProps.filtered.length ||
      this.props.brands.length !== nextProps.brands.length
    ) {
      return true;
    }
    if (
      (nextProps.filtered.length > 0 &&
        this.props.filtered[0].name !== nextProps.filtered[0].name) ||
      (nextProps.filtered.length > 0 &&
        this.props.filtered[0].price !== nextProps.filtered[0].price) ||
      (nextProps.filtered.length > 0 &&
        this.props.filtered[0].brand !== nextProps.filtered[0].brand)
    ) {
      return true;
    }
    return false;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log(prevProps.filtered.length, this.props.filtered.length);
    this.props.setFiltered(this.props.filtered);
  }
  render() {
    const renderFiltered = filtered => {
      // console.log(this.props.brands);
      if (filtered.length < 1 || this.props.brands < 1) {
        return <h2 id="no-match-error">No Matching Products Found</h2>;
      }
      return filtered.map(product =>
        <ProductCard
          key={product._id}
          data={product}
          allBrands={this.props.brands}
          viewProduct={this.props.viewProduct}
          viewBrand={this.props.viewBrand}
        />
      );
    };
    return (
      <section id="browser">
        {renderFiltered(this.props.filtered)}
      </section>
    );
  }
}

// export component
export default BrowserComp;
