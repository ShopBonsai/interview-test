// Framework
import React from "react";
import { Row, Col } from "reactstrap";
import BrowserContainer from "../browser/container";
import FilterContainer from "../filter/container";
import SortContainer from "../sort/container";

// define component
const All = () =>
  <Row noGutters id="products-all">
    <Col xs="12" lg="2">
      <FilterContainer />
      <SortContainer />
    </Col>
    <Col xs="12" lg="10">
      <BrowserContainer />
    </Col>
  </Row>;

// export component
export default All;
