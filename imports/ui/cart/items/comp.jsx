// import modules
import React from "react";
import { Row, Col } from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

// define component
const ItemsComp = ({ ...props }) =>
  <Row>
    <Col id="cart-items">
      <h2>
        SmartCart Items
      </h2>
      <ol>
        <li>asdf</li>
        <li>asdf</li>
        <li>asdf</li>
        <li>asdf</li>
      </ol>
    </Col>
  </Row>;

// export component
export default ItemsComp;
