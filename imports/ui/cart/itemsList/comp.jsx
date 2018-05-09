// Framework
import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Form, Label, Button } from "reactstrap";
import QuantitySelect from "../../common/quantitySelect";
import Brands from "../../../api/brands/collection";
import Merchants from "../../../api/merchants/collection";
import Products from "../../../api/products/collection";
import helpers from "../../../helpers";

// define component
const ItemsListComp = ({ ...props }) => {
  const setItems = (cartItems, brands, products) => {
    if (cartItems.length > 0 && brands.length > 0) {
      const cartItemIds = cartItems.map(item => item.product);
      const cartProducts = products.filter(product =>
        cartItemIds.includes(product._id)
      );
      // console.log("Cart Items:", cartProducts);
      return cartProducts.map(cartProduct =>
        <li className="grid-item" key={cartProduct._id}>
          <div className="thumbnail flex-item">
            <img src={cartProduct.image} />
          </div>
          <div className="name flex-item">
            <h3>
              {helpers.titleize(cartProduct.name)}
            </h3>
            <h5>
              by {helpers.getSingleRef(cartProduct.brand, brands)}
            </h5>
            <p>
              Size: {helpers.titleize(helpers.adjustSizes(cartProduct.size))}
            </p>
            <p>
              Colour: {helpers.titleize(cartProduct.color)}
            </p>
          </div>
          <div className="price flex-item">
            <p>Price</p>
            <h4>
              $ {helpers.formatPrice(cartProduct.price)}
            </h4>
          </div>
          <div className="quantity flex-item">
            <Form
              onChange={props.updateQuantity}
              data-productid={cartProduct._id}
            >
              <Label htmlFor="quantity">Quantity</Label>
              <QuantitySelect
                name="quantity"
                maxQuantity={cartProduct.quantity}
                currentValue={helpers.getCartQuantity(
                  cartProduct._id,
                  cartItems
                )}
              />
            </Form>
          </div>
          <div className="delete flex-item">
            <Button
              color="danger"
              onClick={props.deleteItem}
              data-productid={cartProduct._id}
            >
              Delete
            </Button>
          </div>
        </li>
      );
    }
    return (
      <li>
        <h5 id="no-items">No Items in Cart</h5>
      </li>
    );
  };
  return (
    <ul id="cart-list">
      {setItems(props.cartItems, props.brands, props.products)}
    </ul>
  );
};

// export component
export default withTracker(({ ...props }) => {
  Meteor.subscribe("brands");
  Meteor.subscribe("merchants");
  Meteor.subscribe("products");
  Meteor.subscribe("users");
  return {
    cartItems: props.cartItems,
    brands: Brands.find().fetch(),
    merchants: Merchants.find().fetch(),
    products: Products.find().fetch(),
    users: Meteor.users.find().fetch()
  };
})(ItemsListComp);
