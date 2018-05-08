// import modules
import React from "react";
import { Container, Row, Col } from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import NavHeader from "../navHeader/index.jsx";
import ItemsContainer from "./items/container";

// define component
const CartComp = ({ ...props }) =>
  <Container fluid id="cart-page">
    <NavHeader
      heading="Bonsai SmartCart"
      subtitle="Look sharp and stay smart with your own Bonsai SmartCart"
      id="cart-head"
    />
    <Container>
      <Row>
        <Col id="cart-intro">
          <h2>
            <FontAwesomeIcon icon="shopping-cart" />SmartCart
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Col>
      </Row>
      <ItemsContainer />
    </Container>
  </Container>;

// export component
export default CartComp;
