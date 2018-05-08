// import modules
import React from "react";
import { Container } from "reactstrap";
import MainNav from "../common/mainNav/index";
import NavHeader from "../common/navHeader/index";
import All from "./all";
import One from "./one";
import defaultState from "../../redux/defaultState.json";

// define component
const ShopComp = ({ ...props }) =>
  <Container fluid id="products-page">
    <NavHeader
      heading="Bonsai Shop"
      subtitle="Browse and shop our full collection of exciting products and get free shipping on orders over $99"
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
export default ShopComp;
