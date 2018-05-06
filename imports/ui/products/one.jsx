// Framework
import React from "react";
import { Row, Col, Button } from "reactstrap";

// define component
const One = ({ ...props }) =>
  <Row noGutters id="products-one">
    <Col xs="12" lg="2">
      <Button onClick={props.viewAll}>View All Products</Button>
      <p>
        {props.productShow}
      </p>
    </Col>
  </Row>;

// export component
export default One;
