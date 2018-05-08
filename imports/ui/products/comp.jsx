// import modules
import React from "react";
import { Container } from "reactstrap";
import MainNav from "../mainNav/index";
import NavHeader from "../navHeader/index";
import All from "./all";
import One from "./one";
import defaultState from "../../redux/defaultState.json";

// define component
const ProductsComp = ({ ...props }) =>
  <Container fluid id="products-page">
    <NavHeader
      heading="Bonsai Products"
      subtitle="Browse our full collection of exciting products here!"
      id="products-head"
    />
    {props.productShow !== ""
      ? <One
          productShow={props.productShow}
          viewAll={props.viewAll}
          viewBrand={props.viewBrand}
          viewCategory={props.viewCategory}
          viewMerchant={props.viewMerchant}
          addToCart={props.addToCart}
        />
      : <All />}
  </Container>;

// export component
export default ProductsComp;
