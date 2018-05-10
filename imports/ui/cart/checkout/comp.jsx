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
      <CheckoutForm
        submitHandler={props.submitHandler}
      />
    </Container>
  </section>;

// export component
export default CheckoutComp;
