// Framework
import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Jumbotron,
} from "reactstrap";
import MainNav from "../mainNav/index";
import NavHeader from "../navHeader/index";
import AllProducts from "./AllProducts";
import Filters from "./Filters";

// define component
class Products extends PureComponent {
  componentDidMount() {
    document.title = "Products at Bonsai Online Store";
  }
  render() {
    return (
      <Container fluid id="products-page">
        <NavHeader
          heading="Bonsai Products"
          subtitle="Browse our full collection of exciting products here!"
        />
        <Row noGutters>
          <Col xs="12" lg="2">
            <Filters />
          </Col>
          <Col xs="12" lg="10">
            <AllProducts />
          </Col>
        </Row>
      </Container>
    );
  }
}

// export component
export default Products;
