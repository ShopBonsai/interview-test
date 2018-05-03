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
import helpers from "../../helpers";
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Table,
  Button,
  CardGroup,
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  CardSubtitle,
  CardText,
  CardColumns,
  CardBody
} from "reactstrap";

// define component
class AllProducts extends PureComponent {
  constructor(props) {
    super(props);
    this.renderCards = this.renderCards.bind(this);
  }
  renderCards(array) {
    if (array.length > 0) {
      return array.map(data =>
        <div key={data._id} className="product-card">
          <img
            width="100%"
            src={data.image}
            alt="Card image cap"
            className="product-card"
          />
          <section>
            <CardTitle>
              <Link to={`/products/${data._id}`}>
                {data.name}
              </Link>
            </CardTitle>
            <CardSubtitle>
              <Link to={`/brands/${data.brand}`}>
                {helpers.getBrandName(data.brand, this.props.allBrands)}
              </Link>
            </CardSubtitle>
            <CardText>$ {helpers.formatPrice(data.price)}</CardText>
            <Button color="primary">Add to Cart</Button>
          </section>
        </div>
      );
    }
    return console.log(array.length);
  }
  render() {
    return (
      <section id="products-index">
        {this.renderCards(this.props.allProducts)}
      </section>
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
})(AllProducts);
