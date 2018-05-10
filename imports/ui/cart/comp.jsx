// import modules
import React from "react";
import { Container, Row, Col } from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import ItemsListContainer from "./itemsList/container";
import SummaryContainer from "./summary/container";
import CheckoutContainer from "./checkout/container";
import NavHeader from "../common/navHeader/index.jsx";

// define component
const CartComp = ({ ...props }) => {
  const viewCheckout = status => {
    if (status) {
      return (
        <CheckoutContainer
          orderStatus={props.orderStatus}
          profileTypes={props.profileTypes}
          products={props.products}
        />
      );
    }
    return (
      <Row id="cart-items" noGutters>
        <Col xs="12">
          <h2>My Items</h2>
        </Col>
        <Col xs="12">
          <ItemsListContainer />
        </Col>
      </Row>
    );
  };
  return (
    <Container fluid id="cart-page">
      <NavHeader
        heading="Bonsai SmartCart"
        subtitle="Look sharp and stay smart with your own Bonsai SmartCart"
        id="cart-head"
      />
      <Container>
        <Row>
          <Col xs="12" md="6" id="cart-intro">
            <article>
              <h2>
                <FontAwesomeIcon icon="shopping-cart" />SmartCart
              </h2>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </article>
          </Col>
          <Col xs="12" md="6" id="order-summary">
            <SummaryContainer products={props.products} toggleCheckout={props.toggleCheckout} checkoutVisible={props.checkoutVisible} />
          </Col>
        </Row>
        {viewCheckout(props.checkoutVisible)}
      </Container>
    </Container>
  );
};

// export component
export default CartComp;
