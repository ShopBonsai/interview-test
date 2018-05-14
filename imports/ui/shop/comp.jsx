// import modules
import React from "react";
import { Container } from "reactstrap";
import All from "./all";
import One from "./one";
import MainNav from "../common/mainNav/index";
import ModalContainer from "../common/modal/container";
import NavHeader from "../common/navHeader/index";
import defaultState from "../../redux/defaultState.json";

// define component
const ShopComp = ({ ...props }) =>
  <Container fluid id="products-page">
    <ModalContainer />
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
