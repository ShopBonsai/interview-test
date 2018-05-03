// Framework
import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Jumbotron, Table, Button } from "reactstrap";

// define component
class StoreFront extends PureComponent {
  componentDidMount() {
    document.title = "Store Front at Bonsai Online Store";
  }
  render() {
    return (
      <Container fluid id="store">
        <Jumbotron>
          <h1 className="display-3">Bonsai Online Store</h1>
          <p className="lead">Welcome to the Bonsai online store! Check out our great deals on fantastic products sourced from all over the world.</p>
          <hr className="my-2" />
          <p>Save big on all Beachwear and get free shipping all summer long!</p>
          <p className="lead">
            <Button color="primary">
              <Link to="/categories/beachwear">Shop Beachwear Now</Link>
            </Button>
          </p>
        </Jumbotron>
        <Row className="store-row">
          <Col xs="12" sm="4" className="store-button">
            <Link to="/brands">
              <Button size="lg" block id="shop-by-brands">
                Shop by Brands
              </Button>
            </Link>
          </Col>
          <Col xs="12" sm="4" className="store-button">
            <Link to="/categories">
              <Button size="lg" block id="shop-by-categories">
                Shop by Categories
              </Button>
            </Link>
          </Col>
          <Col xs="12" sm="4" className="store-button">
            <Link to="/merchants">
              <Button size="lg" block id="shop-by-merchants">
                Shop by Merchants
              </Button>
            </Link>
          </Col>
        </Row>
        <Row className="store-row">
          <Col xs="12" className="store-button">
            <Link to="/products">
              <Button size="lg" block id="shop-all-products">
                Shop by Products
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

// export component
export default StoreFront;
