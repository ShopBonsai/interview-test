// Framework
import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Container, Row, Col, Button, Table } from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
// components
import Brands from "../../api/brands/collection";
import Products from "../../api/products/collection";
import Categories from "../../api/categories/collection";
import ProfileTypes from "../../api/profileTypes/collection";
import Merchants from "../../api/merchants/collection";
import helpers from "../../helpers";
import AddToCart from "./addToCart";

// define component
const One = ({ ...props }) => {
  const product = props.products[0];
  const merchantName = helpers.titleize(
    helpers.getMerchantProfile(product.user, props.users, props.merchants).name
  );
  const merchantId = helpers.getMerchantProfile(
    product.user,
    props.users,
    props.merchants
  )._id;
  return (
    <div id="products-one">
      <Row noGutters id="back-to-all-products">
        <Col xs="12" onClick={props.viewAll}>
          <FontAwesomeIcon icon="chevron-circle-left" />
          All Products
        </Col>
      </Row>
      <Container>
        <Row noGutters id="product-show">
          <Col xs="12">
            <h1>
              {helpers.titleize(product.name)}
            </h1>
            <h4 onClick={props.viewBrand} data-brandid={product.brand}>
              {helpers.getSingleRef(product.brand, props.brands)}
            </h4>
            <h6 onClick={props.viewCategory} data-categoryid={product.category}>
              {helpers.titleize(
                helpers.getSingleRef(product.category, props.categories)
              )}
            </h6>
          </Col>
          <Col xs="12" md="4" id="product-image">
            <img src={product.image} />
          </Col>
          <Col xs="12" md="8" id="product-desc">
            <p>
              {product.description}
            </p>
            <p id="merchant-name">
              Merchanted by&nbsp;
              <span onClick={props.viewMerchant} data-merchantid={merchantId}>
                {merchantName}
              </span>
            </p>
          </Col>
        </Row>
        <Row noGutters>
          <Col xs="12">
            <Table>
              <thead>
                <tr>
                  <th>Price $</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>In Stock</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {helpers.formatPrice(product.price)}
                  </td>
                  <td>
                    {helpers.titleize(product.color)}
                  </td>
                  <td>
                    {helpers.titleize(helpers.adjustSizes(product.size))}
                  </td>
                  <td>
                    {product.quantity}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row noGutters>
          <Col id="product-buttons">
            <AddToCart quantity={product.quantity} addToCart={props.addToCart} id={product._id}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// export component
export default withTracker(({ ...props }) => {
  Meteor.subscribe("brands");
  Meteor.subscribe("products");
  Meteor.subscribe("categories");
  Meteor.subscribe("merchants");
  Meteor.subscribe("profileTypes");
  Meteor.subscribe("users");
  return {
    // viewAll: props.viewAll,
    brands: Brands.find().fetch(),
    products: Products.find({ _id: props.productShow }).fetch(),
    categories: Categories.find().fetch(),
    users: Meteor.users.find().fetch(),
    profileTypes: ProfileTypes.find().fetch(),
    merchants: Merchants.find().fetch()
  };
})(One);
