// Framework
import React, { PureComponent } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
import ProfileTypes from "../../api/profileTypes/collection";
import Categories from "../../api/categories/collection";
import Brands from "../../api/brands/collection";
import Merchants from "../../api/merchants/collection";
import Products from "../../api/products/collection";
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Table,
  Button,
} from 'reactstrap';

// define component
class Store extends PureComponent {
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
          <Col xs="12" sm="4" id="shop-by-brand" className="store-button">
            <Link to="/brands">Shop by Brand</Link>
          </Col>
          <Col xs="12" sm="4" id="shop-by-category" className="store-button">
            <Link to="/categories">Shop by Category</Link>
          </Col>
          <Col xs="12" sm="4" id="shop-by-merchant" className="store-button">
            <Link to="/merchants">Shop by Merchant</Link>
          </Col>
        </Row>
        <Row className="store-row">
          <Col xs="12" id="shop-all-products" className="store-button">
            <Link to="/products">Shop All Products</Link>
          </Col>
        </Row>
      </Container>
    )
  }
}

// export component
export default withTracker(() => {
  Meteor.subscribe("profileTypes");
  Meteor.subscribe("categories");
  Meteor.subscribe("brands");
  Meteor.subscribe("merchants");
  Meteor.subscribe("products");
  Meteor.subscribe("users");
  return {
    // currentUser: Meteor.user(),
    allProfileTypes: ProfileTypes.find().fetch(),
    allCategories: Categories.find().fetch(),
    allBrands: Brands.find().fetch(),
    allMerchants: Merchants.find().fetch(),
    allProducts: Products.find().fetch(),
    allUsers: Meteor.users.find().fetch()
  };
})(Store);
