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
class Home extends PureComponent {
  render() {
    return (
      <Jumbotron fluid>
        <Container fluid>
          <Row>
            <Col xs="12" md="8">
              <h1>Store</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </Col>
          </Row>
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
            <Col xs="6">
              <p>{JSON.stringify(this.props.allProfileTypes)}</p>
            </Col>
            <Col xs="6">
              <p>{JSON.stringify(this.props.allUsers[0])}</p>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
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
})(Home);
