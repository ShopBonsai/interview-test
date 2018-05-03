// Framework
import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import MainNav from "../mainnav/index";
import AllProducts from "./AllProducts";
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Table,
  Button,
} from 'reactstrap';

// define component
class Products extends PureComponent {
  componentDidMount() {
    document.title = "Products at Bonsai Online Store";
  }
  render() {
    return (
      <Container fluid id="products-page">
        <MainNav />
        <Jumbotron>
          <h1 className="display-3">Products</h1>
          <p className="lead">Browse our full collection of exciting products here!</p>
        </Jumbotron>
        <Row>
          <Col xs="12" lg="2">
            FILTERS
          </Col>
          <Col xs="12" lg="10">
            <AllProducts id="products-index"/>
          </Col>
        </Row>
      </Container>
    );
  }
}

// export component
export default Products;
