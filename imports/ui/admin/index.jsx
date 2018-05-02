// Framework
import React, { PureComponent } from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
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
} from 'reactstrap';

// define component
class Admin extends PureComponent {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>Collection</th>
                  <th>Items</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Profile Types</td>
                  <td>{this.props.allProfileTypes.length}</td>
                </tr>
                <tr>
                  <td>Categories</td>
                  <td>{this.props.allCategories.length}</td>
                </tr>
                <tr>
                  <td>Brands</td>
                  <td>{this.props.allBrands.length}</td>
                </tr>
                <tr>
                  <td>Merchants</td>
                  <td>{this.props.allMerchants.length}</td>
                </tr>
                <tr>
                  <td>Products</td>
                  <td>{this.props.allProducts.length}</td>
                </tr>
                <tr>
                  <td>Users</td>
                  <td>{this.props.allUsers.length}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col xs="4">
            <p>{JSON.stringify(this.props.allUsers[0])}</p>
          </Col>
          <Col xs="4">
            <p>{JSON.stringify(this.props.allMerchants)}</p>
          </Col>
          <Col xs="4">
            <p>{JSON.stringify(this.props.allProfileTypes)}</p>
          </Col>
        </Row>
      </Container>
    );
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
})(Admin);
