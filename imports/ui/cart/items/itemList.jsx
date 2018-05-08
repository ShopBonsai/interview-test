// import modules
import React from "react";
import { Row, Col, Button } from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import helpers from "../../../helpers";

// define component
const ItemsList = ({ ...props }) => {
  const setItems = () => {
    if (props.cartItems.length > 0 && props.brands.length > 0) {
      const cartItemIds = props.cartItems.map(item => item.product);
      const cartProducts = props.products.filter(product =>
        cartItemIds.includes(product._id)
      );
      console.log("Cart Items:", cartProducts);
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
              {helpers.getSingleRef(cartProduct.brand, props.brands)}
            </h5>
          </div>
          <div className="price flex-item">
            <h4>
              $ {helpers.formatPrice(cartProduct.price)}
            </h4>
          </div>
          <div className="quantity flex-item">
            <h4>
              {helpers.getCartQuantity(cartProduct._id, props.cartItems)}
            </h4>
          </div>
          <div className="delete flex-item">
            <Button color="danger">Delete</Button>
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
      {setItems(props.items)}
    </ul>
  );
};

// export component
export default ItemsList;
