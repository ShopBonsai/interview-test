// Framework
import React from "react";
import { Container, Row, Col } from "reactstrap";
import CheckoutForm from "./checkoutForm";
import helpers from "../../../helpers";

// define component
const CheckoutComp = ({ ...props }) =>
  <section id="checkout">
    <Row noGutters>
      <Col xs="12">
        <h2>Checkout</h2>
      </Col>
    </Row>
    <Container>
      <CheckoutForm submitHandler={props.submitHandler} />
      <article id="checkout-instructions">
        <h2>Instructions</h2>
        <p>
          For demonstration purposes, valid form data except email are pre-filled. To place your order, simply enter your email address and any optional fields.
        </p>
        <p>
          If you submit a username and matching passwords, a user account will be created for future purchases; although all orders will be stored under your email if you don't want to create an account now.
        </p>
        <p>
          To simulate a failing order, change any field besides "cardholder" of the credit card section.
        </p>
        <p>
          When an order is successful, a new order and customer record will be created, along with a user if username and matching passwords were supplied. Product stock counts will also decrease by the order's respective product quantities.
        </p>
      </article>
    </Container>
  </section>;

// export component
export default CheckoutComp;
