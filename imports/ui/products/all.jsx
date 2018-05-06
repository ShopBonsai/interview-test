// Framework
import React, { PureComponent } from "react";
import { Row, Col } from "reactstrap";
import BrowserContainer from "../browser/container";
import FilterContainer from "../filter/container";
import SortContainer from "../sort/container";

// define component
class All extends PureComponent {
  render() {
    return (
      <Row noGutters id="products-all">
        <Col xs="12" lg="2">
          <FilterContainer />
          <SortContainer />
        </Col>
        <Col xs="12" lg="10">
          <BrowserContainer />
        </Col>
      </Row>
    );
  }
}

// export component
export default All;
