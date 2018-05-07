// Framework
import React, { PureComponent } from "react";
import { Container } from "reactstrap";
import MainNav from "../mainNav/index";
import NavHeader from "../navHeader/index";
import All from "./all";
import One from "./one";
import defaultState from "../../redux/defaultState.json";

// define component
class Products extends PureComponent {
  constructor(props) {
    super(props);
    this.viewAll = this.viewAll.bind(this);
    this.viewBrand = this.viewBrand.bind(this);
    this.viewCategory = this.viewCategory.bind(this);
    this.viewMerchant = this.viewMerchant.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }
  componentDidMount() {
    document.title = "Products at Bonsai Online Store";
  }
  viewAll(event) {
    event.preventDefault();
    const { currentTarget } = event;
    this.props.unsetProductShow();
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
    console.log(filter);
    this.props.setFilter(filter);
    this.props.unsetProductShow();
  }
  viewCategory(event) {
    event.preventDefault();
    const { currentTarget } = event;
    console.log(currentTarget.dataset.categoryid);
    const filter = {
      product: {
        color: "any",
        name: "",
        priceMax: "",
        priceMin: "",
        size: "any"
      },
      brands: [],
      categories: [currentTarget.dataset.categoryid],
      merchants: []
    };
    console.log(filter);
    this.props.setFilter(filter);
    this.props.unsetProductShow();
  }
  viewMerchant(event) {
    event.preventDefault();
    const { currentTarget } = event;
    console.log(currentTarget.dataset.merchantid);
    const filter = {
      product: {
        color: "any",
        name: "",
        priceMax: "",
        priceMin: "",
        size: "any"
      },
      brands: [],
      categories: [],
      merchants: [currentTarget.dataset.merchantid]
    };
    console.log(filter);
    this.props.setFilter(filter);
    this.props.unsetProductShow();
  }
  addToCart(event) {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);
    const item = {
      product: currentTarget.dataset.proudctid,
      quantity: parseInt(formData.get("quantity"))
    };
    if (item.quantity > 0) {
      console.log(item);
    }
  }
  render() {
    return (
      <Container fluid id="products-page">
        <NavHeader
          heading="Bonsai Products"
          subtitle="Browse our full collection of exciting products here!"
          id="products-head"
        />
        {this.props.productShow !== ""
          ? <One
              productShow={this.props.productShow}
              viewAll={this.viewAll}
              viewBrand={this.viewBrand}
              viewCategory={this.viewCategory}
              viewMerchant={this.viewMerchant}
              addToCart={this.addToCart}
            />
          : <All />}
      </Container>
    );
  }
}

// export component
export default Products;
