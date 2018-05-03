// Framework
import React from "react";
import { Row, Col, Jumbotron } from "reactstrap";
import MainNav from "../mainNav/index";

// define component
const NavHeader = ({ ...props }) =>
  <Row noGutters className="nav-header">
    <Col>
      <MainNav />
      <Jumbotron>
        <h1 className="display-3">
          {props.heading}
        </h1>
        <p className="lead">
          {props.subtitle}
        </p>
      </Jumbotron>
    </Col>
  </Row>;

// export component
export default NavHeader;
